interface Post {
  slug: string;
  content: string;
}

export async function getPosts(): Promise<Post[]> {
  const data = await fetch('https://api.example.org/posts').then((response) =>
    response.json()
  );

  return data;
}

export async function getPost(postId: string): Promise<Post | null> {
  return await fetch(`https://api.example.org/posts/${postId}`).then(
    (response) => response.json()
  );
}

interface CreatePostParams {
  slug: string;
  content: string;
}

export async function createPost({ slug, content }: CreatePostParams) {
  await fetch('https://api.example.org/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slug,
      content,
    }),
  });
}
