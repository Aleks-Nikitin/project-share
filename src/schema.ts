import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    slug: varchar("slug", { length: 140 }).notNull(),
    tagline: varchar("tagline", { length: 200 }),
    description: text("description"),
    website_url: text("website_url"),
    tags: jsonb("tags").$type<string[]>(),
    voteCount: integer("vote_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    status: varchar("status", { length: 20 }).default("pending"),
    submittedBy: varchar("submitted_by", { length: 120 }).default("anonymous"),
    userId: varchar("user_id", { length: 255 }),
    organizationId: varchar("organization_id", { length: 255 }),
    previewImageUrl: text("preview_image_url"),
    githubUrl: text("github_url"),
    githubStars: integer("github_stars").default(0),
    badgeStatus: varchar("badge_status", { length: 50 }).default(
      "Production Ready",
    ),
  },
  (table) => ({
    slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
    statusIdx: index("products_status_idx").on(table.status),
    organizationIdx: index("products_organization_idx").on(
      table.organizationId,
    ),
  }),
);
