import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

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
export interface SectionTypes {
  heading: string;
  content: string;
  description: string;
  steps: {
    description: string;
    command: string;
    step: number;
  }[];
  code: { language: string; content: string };
  example: {
    component: { filename: string; code: string; language: string };
  };
}
const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div
      className="flex flex-col justify-between gap-8 cursor-pointer sm:flex-row group sm:items-center"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-2.5">
          <div className="relative h-6 rounded-full size-6">
            <Image
              className="object-cover rounded-full size-6"
              src={
                post?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0V_aHE12tdUfBMu2ZvPg-eCfzXDh8B8Zx3xzI2NukeQ&s"
              }
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
              alt={post?.author ? post?.author.name : "Unknown author"}
            />
          </div>
          <small className="py-2">
            By {post?.author ? post?.author.name : "Unknown author"}
          </small>
        </div>{" "}
        <h2 className="text-lg font-medium">{post.title}</h2>
      </div>
      <div className="relative w-full h-full sm:max-w-40 rounded-xl aspect-video">
        <Image
          className="object-cover duration-200 ease-in hover:scale-95 rounded-xl"
          src={post?.url}
          alt={post?.title}
          layout="fill"
          priority
          quality={100}
        />
      </div>
    </div>
  );
};

export default Post;
