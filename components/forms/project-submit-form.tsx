"use client";
import { FormField } from "./form-field";
import { Button } from "../ui/button";
export default function ProjectSubmitForm() {
  return (
    <form className="flex flex-col gap-4 space-y-5 mx-auto max-w-lg">
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
      <Button
        size="lg"
        type="submit"
        className="mb-3.5 w-full text-base text-white px-8 py-6 shadow-lg bg-emerald-700 hover:bg-emerald-900"
      >
        Submit Project
      </Button>
    </form>
  );
}
