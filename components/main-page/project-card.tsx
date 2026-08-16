interface Project {
  id: number;
  title: string;
  description: string;
  votes: number;
  tags: string[];
  avatar: string;
  GithubLink: string;
}
export default function ProjectCard({ project }: { project: Project }) {
  return <h1>project card</h1>;
}
