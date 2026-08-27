CREATE TABLE "product_votes" (
	"id" serial PRIMARY KEY,
	"product_id" integer NOT NULL,
	"user_id" varchar(255) NOT NULL,
	CONSTRAINT "user_product_unique_idx" UNIQUE("user_id","product_id")
);
--> statement-breakpoint
CREATE INDEX "product_votes_product_idx" ON "product_votes" ("product_id");--> statement-breakpoint
ALTER TABLE "product_votes" ADD CONSTRAINT "product_votes_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;