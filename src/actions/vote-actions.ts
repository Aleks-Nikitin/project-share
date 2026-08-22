"use server";
import { db } from "../db";
import { products } from "../schema";
import { eq, sql } from "drizzle-orm";
import { updateTag } from "next/cache";

export async function upvoteProject(projectId: number) {
  await db
    .update(products)
    .set({ voteCount: sql`${products.voteCount} + 1` })
    .where(eq(products.id, projectId));

  updateTag("products");
}
