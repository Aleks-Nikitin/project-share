import { FlameIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function FeaturedProject() {
  return (
    <section className="py-20 border border-zinc-800/80">
      <div className="wrapper">
        <h1>Featured Architecture of the day</h1>
        <Card className="relative mx-auto w-full pt-0">
          <div className=" bg-black/35" />
          <CardHeader>
            <CardAction>
              <h2>Featured</h2>
            </CardAction>
            <CardTitle>Design systems meetup</CardTitle>
            <CardDescription>
              A practical talk on component APIs, accessibility, and shipping
              faster.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">View Event</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
