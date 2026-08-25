import { clerkMiddleware, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default clerkMiddleware(async (auth) => {
  const { userId, orgId } = await auth();
  if (userId && !orgId) {
    try {
      const client = await clerkClient();
      const { data: organizations } =
        await client.users.getOrganizationMembershipList({ userId: userId });
      if (organizations && organizations.length > 0) {
        return NextResponse.next();
      }
      const user = await client.users.getUser(userId);
      const orgName = user.firstName || "My Organization";
      await client.organizations.createOrganization({
        name: orgName,
        createdBy: userId,
      });
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk's auto-proxy path
    "/__clerk/:path*",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
