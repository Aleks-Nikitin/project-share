import { asc, between, count, eq, getColumns, sql } from "drizzle-orm";
import { db } from "../db";
import { products } from "../schema";

export async function getProducts() {
  return db.select().from(products);
}
