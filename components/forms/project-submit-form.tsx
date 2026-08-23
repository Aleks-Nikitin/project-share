"use client";
import { FormField } from "./form-field";
import { useState } from "react";
import { Button } from "../ui/button";
import { addProductAction } from "@/src/actions/product-actions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";
const initialState = {
  success: false,
  message: "",
  error: {},
};
const AVAILABLE_TAGS = [
  "Full-Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "AI/ML",
  "Next.js",
  "React",
  "Node.js",
];

export default function ProjectSubmitForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );
  const { errors, message, success } = state;
  return (
    <form
      className="flex flex-col gap-4 space-y-5 mx-auto max-w-lg "
      action={formAction}
    >
      <div className="space-y-5">
        <FormField
          label="Project Name"
          name="name"
          id="name"
          required
          placeholder="Enter project name"
          error={errors?.name}
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Slug"
          name="slug"
          id="slug"
          required
          placeholder="Your Slug"
          error={errors?.slug}
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Tagline"
          name="tagline"
          id="tagline"
          required
          placeholder="Your tagline"
          error={errors?.tagline}
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Description"
          name="description"
          id="description"
          required
          placeholder="Your description"
          error={errors?.description}
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
          error={errors?.website_url}
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="GitHub url"
          name="githubUrl"
          id="githubUrl"
          required
          placeholder="Enter Your github url"
          error={errors?.githubUrl}
        />
      </div>
      <div className="space-y-5">
        <FormField
          label="Preview Image Url"
          name="previewImageUrl"
          id="previewImageUrl"
          required
          placeholder="Enter Your preview image url"
          error={errors?.previewImageUrl}
        />
      </div>
      <div className="space-y-2">
        <label className="text-lg font-bold text-white pb-5">
          Project Tags
        </label>

        <ToggleGroup
          multiple
          value={selectedTags}
          onValueChange={(value) => {
            setSelectedTags(value);
            console.log("selectedTags", selectedTags);
          }}
          className="flex flex-wrap justify-start gap-2 py-4"
        >
          {AVAILABLE_TAGS.map((tag) => (
            <ToggleGroupItem
              key={tag}
              value={tag}
              aria-label={`Toggle ${tag}`}
              className="bg-[#182232] text-slate-300 border border-zinc-800 hover:bg-[#243246] aria-pressed:bg-emerald-700 aria-pressed:text-white aria-pressed:border-emerald-700 aria-pressed:hover:bg-emerald-900"
            >
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
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
