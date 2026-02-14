import { getPosts, getAllTags } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return {
    posts: getPosts(),
    tags: getAllTags()
  };
};
