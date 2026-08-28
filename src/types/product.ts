import { products } from "@/src/schema";
import { InferSelectModel } from "drizzle-orm";

export type ProductWithVote = InferSelectModel<typeof products> & {
  hasVoted: boolean;
};
