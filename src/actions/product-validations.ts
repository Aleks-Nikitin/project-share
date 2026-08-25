import { z } from "zod";
export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(50, { message: "Slug must be at most 50 characters long" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be a valid slug",
    }),
  tagline: z
    .string()
    .max(200, { message: "Tagline must be at most 200 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" })
    .optional(),
  website_url: z
    .string()
    .min(1, { message: "Website URL must be a valid URL" }),
  tags: z.array(z.string()),
  githubUrl: z.string().optional(),
  githubStars: z.number().optional(),
  badgeStatus: z.string().optional(),
  status: z.string().optional(),
  submittedBy: z.string().optional(),
  userId: z.string().optional(),
  organizationId: z.string().optional(),
  previewImageUrl: z.string().optional(),
  voteCount: z.number().optional(),
  createdAt: z.date().optional(),
  approvedAt: z.date().optional(),
});
