"use client";
import { FormField } from "./form-field";
import { Button } from "../ui/button";
import { addProductAction } from "@/src/actions/product-actions";
import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";
const initialState = {
  success: false,
  message: "",
  error: {},
};

export default function ProjectSubmitForm() {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );
  return (
    <form
      className="flex flex-col gap-4 space-y-5 mx-auto max-w-lg"
      action={formAction}
    >
      <div className="space-y-5">
        <FormField
          label="Project Name"
          name="name"
          id="name"
          required
          placeholder="Enter project name"
          error=""
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Slug"
          name="slug"
          id="slug"
          required
          placeholder="Your Slug"
          error=""
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Tagline"
          name="tagline"
          id="tagline"
          required
          placeholder="Your tagline"
          error=""
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Description"
          name="description"
          id="description"
          required
          placeholder="Your description"
          error=""
          textarea
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Website url"
          name="website_url"
          id="website_url"
          required
          placeholder="Your website url"
          error=""
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="GitHub url"
          name="githubUrl"
          id="githubUrl"
          required
          placeholder="Enter Your github url"
          error=""
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Preview Image Url"
          name="previewImageUrl"
          id="previewImageUrl"
          required
          placeholder="Enter Your preview image url"
          error=""
        />
      </div>
      {/* render all tags and add their selection later */}
      <Button
        size="lg"
        type="submit"
        className="mb-3.5 w-full text-base text-white px-8 py-6 shadow-lg bg-emerald-700 hover:bg-emerald-900"
      >
        {isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <p>Submit Project</p>
        )}
      </Button>
    </form>
  );
}
