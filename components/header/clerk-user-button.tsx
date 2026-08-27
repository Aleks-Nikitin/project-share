"use client";
import { BuildingIcon } from "lucide-react";
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
    </UserButton>
  );
}
