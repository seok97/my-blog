export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2026',
    excerpt: 'Exploring the new features of Next.js, AI-driven development, and the return to optimized Vanilla CSS styling paradigms.',
    date: '2026-04-15',
    tags: ['Next.js', 'Web', 'CSS'],
  },
  {
    id: '2',
    title: 'Building a Second Brain with Obsidian',
    excerpt: 'How to structure your markdown notes for maximum retrieval efficiency and AI integration using local setups.',
    date: '2026-04-10',
    tags: ['Obsidian', 'Productivity'],
  },
  {
    id: '3',
    title: 'Mastering RAG with LangChain',
    excerpt: 'A deep dive into Retrieval-Augmented Generation, exploring LCEL interfaces, custom templates, and effective prompting.',
    date: '2026-03-25',
    tags: ['AI', 'Python', 'LangChain'],
  },
];
