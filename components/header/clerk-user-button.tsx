"use client";
import { BuildingIcon } from "lucide-react";
import Link from "next/link";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
export default function ClerkUserButton() {
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="organizations"
        labelIcon={<BuildingIcon className="size-4" />}
        url="/organizations"
      >
        <div className="p-4">
          <h2>Manage Organization</h2>
          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl="/submit"
            afterSelectPersonalUrl="/submit"
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage
        label="Admin"
        labelIcon={<BuildingIcon className="size-4" />}
        url="/admin"
      >
        <div className="p-4">
          <h2> Admin Panel</h2>
          <Link href="/admin" className="text-emerald-500 hover:underline">
            Go to Admin Panel
          </Link>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
