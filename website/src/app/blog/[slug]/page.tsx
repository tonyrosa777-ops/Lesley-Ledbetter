import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { siteConfig } from "@/data/site";
import BlogPostClient from "./BlogPostClient";

/* ── Static params for all 9 articles ── */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ── Dynamic metadata per article ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  const articleUrl = `${siteConfig.schema.url}/blog/${post.slug}`;

  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Lesley Ledbetter"],
      url: articleUrl,
    },
    other: {
      "article:published_time": post.publishedAt,
      "article:author": "Lesley Ledbetter",
      "article:section": post.category,
    },
  };
}

/* ── Article JSON-LD structured data ── */
function ArticleJsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
}) {
  const articleUrl = `${siteConfig.schema.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Lesley Ledbetter",
      url: `${siteConfig.schema.url}/about`,
      jobTitle: "Spiritual Consultant",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.schema.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: post.category,
    wordCount: post.content.join(" ").split(/\s+/).length,
    url: articleUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ── Page component ── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <ArticleJsonLd post={post} />
      <BlogPostClient post={post} />
    </>
  );
}
