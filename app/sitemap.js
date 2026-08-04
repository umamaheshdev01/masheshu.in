import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap() {
  const posts = getAllPosts();
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  const staticPages = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/work"), changeFrequency: "weekly", priority: 0.9, lastModified: latest },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/photos"), changeFrequency: "monthly", priority: 0.7 },
  ];

  const postPages = posts.map((post) => ({
    url: absoluteUrl(`/post/${post.slug}`),
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
