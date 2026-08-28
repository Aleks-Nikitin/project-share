import { and, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "../db";
import { products, productVotes } from "../schema";
import {
  isPopularFilter,
  tagSlugToFilterName,
} from "@/lib/project-utils";

export async function getProducts(
  userId?: string | null,
  searchQuery?: string,
  tagSlug?: string,
) {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const tagFilter = tagSlugToFilterName(tagSlug);
  const popularOnly = isPopularFilter(tagSlug);

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
        popularOnly ? gt(products.voteCount, 0) : undefined,
        tagFilter
          ? sql`EXISTS (
              SELECT 1 FROM jsonb_array_elements_text(${products.tags}) AS tag
              WHERE lower(tag) = lower(${tagFilter})
            )`
          : undefined,
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

export async function getProjectBySlug(slug: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return rows[0] ?? null;
}
