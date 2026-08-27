"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import { products, productVotes } from "../schema";
import { db } from "../db";
import { success, z } from "zod";
import { eq, and, sql } from "drizzle-orm";
import { FormState } from "./types";
import { revalidatePath } from "next/cache";
export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  console.log(formData);
  try {
    const { userId, orgId } = await auth();

    if (!userId)
      return {
        success: false,
        message: "You need to be signed in to submit a product",
      };
    if (!orgId) {
      return {
        success: false,
        message: "You need to be in an organization to submit a product",
      };
    }
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress || "anonymous";
    const rawFormData = {
      ...Object.fromEntries(formData.entries()),
      tags: formData.getAll("tags"),
    };
    const validatedData = productSchema.safeParse(rawFormData);
    if (!validatedData.success) {
      const errors = validatedData.error.flatten().fieldErrors;
      console.log("errors", errors);
      return {
        success: false,
        errors,
        message: "Validation failed",
      };
    }
    const {
      name,
      tagline,
      description,
      website_url,
      githubUrl,
      previewImageUrl,
      slug,
      tags,
    } = validatedData.data;
    await db.insert(products).values({
      name,
      slug,
      description,
      tagline,
      website_url,
      githubUrl,
      previewImageUrl,
      userId,
      organizationId: orgId,
      tags: tags,
      status: "pending",
      submittedBy: userEmail,
    });
    return {
      success: true,
      message:
        "Product added. It will be reviewed by our team and published soon.",
    };
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed",
      };
    }
    return {
      success: false,
      message: "Unable to add product",
    };
  }
};
export const toggleVoteAction = async (productId: number) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You need to be signed in to vote",
      };
    }
    const existingVote = await db
      .select()
      .from(productVotes)
      .where(
        and(
          eq(productVotes.productId, productId),
          eq(productVotes.userId, userId),
        ),
      )
      .limit(1);
    const hasVoted = existingVote.length > 0;
    if (hasVoted) {
      await db
        .delete(productVotes)
        .where(
          and(
            eq(productVotes.productId, productId),
            eq(productVotes.userId, userId),
          ),
        );
      await db
        .update(products)
        .set({ voteCount: sql`${products.voteCount} - 1` })
        .where(eq(products.id, productId));
    } else {
      await db.insert(productVotes).values({
        productId,
        userId,
      });
      await db
        .update(products)
        .set({ voteCount: sql`${products.voteCount} + 1` })
        .where(eq(products.id, productId));
    }

    revalidatePath("/");
    revalidatePath(`/projects/${productId}`);
    return {
      success: true,
      message: hasVoted ? "Vote added" : "Vote removed",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Unable to toggle vote",
    };
  }
};
