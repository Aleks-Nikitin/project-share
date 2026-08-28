import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "../db";
import { products, productVotes } from "../schema";

export async function getProducts(
  userId?: string | null,
  searchQuery?: string,
) {
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
    .where(
      and(
        eq(products.status, "approved"),
        searchQuery?.trim()
          ? or(
              ilike(products.name, `%${searchQuery.trim()}%`),
              ilike(products.slug, `%${searchQuery.trim()}%`),
              ilike(products.tagline, `%${searchQuery.trim()}%`),
              ilike(products.description, `%${searchQuery.trim()}%`),
              sql`${products.tags}::text ILIKE ${`%${searchQuery.trim()}%`}`,
            )
          : undefined,
      ),
    )
    .orderBy(desc(products.voteCount));
  return rows.map(({ product, hasVoted }) => ({
    ...product,
    hasVoted: Boolean(hasVoted),
  }));
}
