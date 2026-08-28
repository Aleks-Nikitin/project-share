"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "../db";
import { products } from "../schema";

type ActionResult = {
  success: boolean;
  message: string;
};

async function requireAdmin(): Promise<ActionResult | null> {
  await auth.protect();

  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "You must be signed in" };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const isAdmin = user.publicMetadata?.isAdmin ?? false;

  if (!isAdmin) {
    return { success: false, message: "You do not have admin access" };
  }

  return null;
}

export async function getAllProjects() {
  const authError = await requireAdmin();
  if (authError) {
    throw new Error(authError.message);
  }

  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function approveProject(projectId: number): Promise<ActionResult> {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await db
      .update(products)
      .set({ status: "approved", approvedAt: new Date() })
      .where(eq(products.id, projectId));

    updateTag("products");
    return { success: true, message: "Project approved successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to approve project" };
  }
}

export async function rejectProject(projectId: number): Promise<ActionResult> {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await db
      .update(products)
      .set({ status: "rejected" })
      .where(eq(products.id, projectId));

    updateTag("products");
    return { success: true, message: "Project rejected successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to reject project" };
  }
}

export async function deleteProject(projectId: number): Promise<ActionResult> {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await db.delete(products).where(eq(products.id, projectId));

    updateTag("products");
    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete project" };
  }
}
