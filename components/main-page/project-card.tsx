interface Project {
  id: number;
  name: string;
  description: string;
  votes: number;
  tags: string[];
  avatar: string;
  GithubLink: string;
}
export default function ProjectCard() {
  return <h1>project card</h1>;
}
