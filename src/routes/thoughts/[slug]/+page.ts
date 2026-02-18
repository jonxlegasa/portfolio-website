import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const result = getPostBySlug(params.slug);
  if (!result) {
    error(404, 'Post not found');
  }
  return {
    post: result.post,
    content: result.content
  };
};
