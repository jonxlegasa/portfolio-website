import { GITHUB_TOKEN } from '$env/static/private';
import { fetchAllReposCached } from '$lib/helpers';

export async function load() {
  const repos = await fetchAllReposCached(GITHUB_TOKEN);
  const tags = [...new Set(repos.flatMap((r) => r.languages))].sort();
  return { repos, tags };
}
