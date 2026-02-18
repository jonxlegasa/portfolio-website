import { getPostsByTag } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  return {
    tag: params.tag,
    posts: getPostsByTag(params.tag)
  };
};
