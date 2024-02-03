import { http, HttpResponse, passthrough } from 'msw';

let posts = [
  { slug: 'hello-world', content: '# Welcome' },
  { slug: 'my-first-post', content: "# Yo ## What's up?" },
];

export const handlers = [
  http.get('https://api.example.org/posts', () => {
    return HttpResponse.json(posts);
  }),

  http.post('https://api.example.org/posts', async ({ request }) => {
    const newPost = (await request.json()) as { slug: string; content: string };

    posts = [
      ...posts,
      {
        slug: newPost.slug,
        content: newPost.content,
      },
    ];

    return HttpResponse.json(posts);
  }),

  http.get('https://api.example.org/posts/:slug', ({ params }) => {
    const post = posts.find((post) => post.slug === params.slug) ?? null;

    return HttpResponse.json(post);
  }),

  // Remix dev
  http.post('http://localhost:3001/ping', () => {
    return passthrough();
  }),
];
