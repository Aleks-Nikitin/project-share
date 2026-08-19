import { desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "../db";
import { products } from "../schema";

export async function getProducts() {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  return db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
}
