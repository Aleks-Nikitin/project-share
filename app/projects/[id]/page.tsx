"use cache";
import { getProducts } from "@/src/queries/select";
export const generateStaticParams = async () => {
  const projects = await getProducts();
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
};
export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <h1>Project {id} page</h1>;
}
