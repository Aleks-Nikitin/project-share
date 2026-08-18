import { faker } from "@faker-js/faker";
import "dotenv/config";

import { db } from "./db";
import { products } from "./schema";

const productStatuses = ["pending", "approved", "rejected"] as const;
const badgeStatuses = ["Production Ready", "Beta"] as const;

function createProductSeed() {
  const name = faker.company.name();
  const slug = faker.helpers
    .slugify(name)
    .toLowerCase()
    .slice(0, 140)
    .replace(/-+$/g, "");

  return {
    name,
    slug: slug || "sample-product",
    tagline: faker.company.catchPhrase(),
    description: faker.lorem.paragraphs(2),
    website_url: faker.internet.url(),
    tags: faker.helpers.arrayElements(
      [
        "nextjs",
        "react",
        "typescript",
        "ai/ml",
        "saas",
        "startup",
        "frontend",
        "backend",
        "full-stack",
        "open-source",
        "developer-tools",
        "analytics",
      ],
      { min: 2, max: 5 },
    ),
    voteCount: faker.number.int({ min: 0, max: 2500 }),
    createdAt: faker.date.recent({ days: 500 }),
    approvedAt: faker.datatype.boolean()
      ? faker.date.recent({ days: 180 })
      : null,
    status: faker.helpers.arrayElement(productStatuses),
    submittedBy: faker.internet.username(),
    userId: faker.string.uuid(),
    organizationId: faker.string.uuid(),
    previewImageUrl: faker.image.url({ width: 1200, height: 800 }),
    githubUrl: faker.internet.url(),
    githubStars: faker.number.int({ min: 0, max: 20000 }),
    badgeStatus: faker.helpers.arrayElement(badgeStatuses),
  };
}

async function main() {
  await db.delete(products);

  const rows = Array.from({ length: 20 }, createProductSeed);
  await db.insert(products).values(rows);

  console.log(`Seeded ${rows.length} products`);
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
