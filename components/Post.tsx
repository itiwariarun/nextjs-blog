import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div
      className="flex flex-col sm:flex-row cursor-pointer group justify-between sm:items-center gap-8"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-2.5">
          <img
            className="size-6 object-cover rounded-full"
            src={
              post?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0V_aHE12tdUfBMu2ZvPg-eCfzXDh8B8Zx3xzI2NukeQ&s"
            }
            alt={post?.author ? post?.author.name : "Unknown author"}
          />
          <small className="py-2">
            By {post?.author ? post?.author.name : "Unknown author"}
          </small>
        </div>{" "}
        <h2 className="font-medium text-lg">{post.title}</h2>
      </div>
      <img
        className="max-w-full sm:max-w-40 aspect-video object-cover group-hover:scale-105 duration-300 ease-in rounded-xl"
        src={post?.url}
        alt={post?.title}
      />
      {/* <ReactMarkdown children={post.content} /> */}
    </div>
  );
};

export default Post;
