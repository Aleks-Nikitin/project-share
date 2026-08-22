"use server";
import { db } from "../db";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export async function approveProject(projectId: number) {
  await db
    .update(products)
    .set({ status: "approved", approvedAt: new Date() })
    .where(eq(products.id, projectId));

  updateTag("products");
}
export async function deleteProject(projectId: number) {
  await db.delete(products).where(eq(products.id, projectId));

  updateTag("products");
}
