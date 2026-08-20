import ProjectSubmitForm from "@/components/forms/project-submit-form";
export default function SubmitPage() {
  return (
    <div className="wrapper bg-background min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl my-6 text-center font-bold text-white">
        Submit a Project
      </h1>
      <ProjectSubmitForm />
    </div>
  );
}
