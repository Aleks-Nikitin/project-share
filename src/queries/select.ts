import { desc, eq, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "../db";
import { products, productVotes } from "../schema";

export async function getProducts(userId?: string | null) {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const rows = await db
    .select({
      product: products,
      hasVoted: sql<boolean>`CASE WHEN ${productVotes.userId} IS NOT NULL THEN TRUE ELSE FALSE END`,
    })
    .from(products)
    .leftJoin(
      productVotes,
      sql`${products.id} = ${productVotes.productId} AND ${productVotes.userId} = ${userId ?? ""}`,
    )
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
  return rows.map(({ product, hasVoted }) => ({
    ...product,
    hasVoted: Boolean(hasVoted),
  }));
}
