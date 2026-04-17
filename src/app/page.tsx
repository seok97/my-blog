import { posts } from "@/data/posts";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to My Universe</h1>
        <p>Thoughts on Next.js, AI workflows, and building modern architectural structures on the web.</p>
      </section>

      <section className="posts-grid">
        {posts.map((post) => (
          <Link href={`#`} key={post.id} className="post-card">
            <div className="card-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {post.date}
            </div>
            <h2 className="card-title">{post.title}</h2>
            <p className="card-excerpt">{post.excerpt}</p>
            <div className="card-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
