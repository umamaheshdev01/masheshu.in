import { redirect } from "next/navigation";

// The work grid is the post index, so /post on its own goes there rather
// than 404ing. Keeps old links from the Vite version alive.
export default function PostIndex() {
  redirect("/work");
}
