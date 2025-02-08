// src/routes/collections/[collection].ts
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-svelte';


let BUILDERIO_API_KEY = '0214688b3d46478dbb5391384d0ad7a8'
export async function load({ params }: { params: { page?: string[] } }) {
  const urlPath: string = '/' + (params?.page?.join('/') || '');

  const content = await fetchOneEntry({
    model: 'home-page',
    apiKey: BUILDERIO_API_KEY,
    options: getBuilderSearchParams(new URLSearchParams(window.location.search)),
    userAttributes: {
      urlPath,
    },
  });

  return {
    props: {
      content,
    },
  };
}

