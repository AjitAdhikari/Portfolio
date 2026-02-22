import { useQuery } from '@tanstack/react-query';
import type { GitHubRepo } from '@/types';

async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch('https://api.github.com/users/AjitAdhikari/repos?sort=updated&per_page=30');
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}

export function useGitHubRepos() {
  return useQuery({
    queryKey: ['github-repos'],
    queryFn: fetchRepos,
    staleTime: 1000 * 60 * 10,
  });
}
