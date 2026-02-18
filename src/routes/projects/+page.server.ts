import { GITHUB_TOKEN } from '$env/static/private';
import { fetchAllRepos } from '$lib/helpers';

export async function load() {
  const repos = await fetchAllRepos(GITHUB_TOKEN);
  const tags = [...new Set(repos.flatMap((r) => r.languages))].sort();
  return { repos, tags };
}
