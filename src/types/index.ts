export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: 'project' | 'academic';
}
