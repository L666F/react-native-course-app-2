import React, { createContext, useState } from 'react';

const BlogContext = createContext<any>(undefined);

export const BlogProvider = ({ children }: any) => {
  const [blogPosts, setBlogPosts] = useState<any>([]);

  const addBlogPost = () => {
    setBlogPosts([
      ...blogPosts,
      { title: `Blog post #${blogPosts.length + 1}` },
    ]);
  };

  return (
    <BlogContext.Provider
      value={{ data: blogPosts, addBlogPost }}
      children={children}
    />
  );
};

export default BlogContext;
