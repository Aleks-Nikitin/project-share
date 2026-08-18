CREATE TABLE "products" (
	"id" serial PRIMARY KEY,
	"name" varchar(120) NOT NULL,
	"slug" varchar(140) NOT NULL,
	"tagline" varchar(200),
	"description" text,
	"website_url" text,
	"tags" jsonb,
	"vote_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"approved_at" timestamp with time zone,
	"status" varchar(20) DEFAULT 'pending',
	"submitted_by" varchar(120) DEFAULT 'anonymous',
	"user_id" varchar(255),
	"organization_id" varchar(255),
	"preview_image_url" text,
	"github_url" text,
	"github_stars" integer DEFAULT 0,
	"badge_status" varchar(50) DEFAULT 'Production Ready'
);
--> statement-breakpoint
ALTER TABLE "posts_table" DROP CONSTRAINT "posts_table_user_id_users_table_id_fkey";--> statement-breakpoint
DROP TABLE "posts_table";--> statement-breakpoint
DROP TABLE "users_table";--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_idx" ON "products" ("slug");--> statement-breakpoint
CREATE INDEX "products_status_idx" ON "products" ("status");--> statement-breakpoint
CREATE INDEX "products_organization_idx" ON "products" ("organization_id");