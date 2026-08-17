CREATE TABLE "posts_table" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL UNIQUE
);
--> statement-breakpoint
ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_user_id_users_table_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE CASCADE;