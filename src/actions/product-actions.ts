"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import { products } from "../schema";
import { db } from "../db";
import { z } from "zod";

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
};

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  console.log(formData);
  try {
    const { userId } = await auth();

    if (!userId)
      return {
        success: false,
        message: "You need to be signed in to submit a product",
      };
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
      tags: tags || [],
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
