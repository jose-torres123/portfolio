export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string | undefined;
  live?: string | undefined;
  featured: boolean;
}
