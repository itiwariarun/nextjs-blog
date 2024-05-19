import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <Layout>
      <div className="page">
        <h1 className="text-center text-4xl sm:text-5xl lg:text-8xl font-semibold pb-10 md:pb-20">
          Public Feed
        </h1>
        <main>
          {props.feed.slice(0, 1).map((post) => (
            <div key={post?.id} className="post">
              <div
                className="flex flex-col sm:text-center items-center"
                onClick={() => router.push("/p/[id]", `/p/${post?.id}`)}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-5xl max-w-2xl mx-auto pb-8">
                  {post?.title}
                </h2>
                <ReactMarkdown
                  className="pb-12 font-normal md:text-xl text-base max-w-2xl"
                  children={post?.summary}
                />
                <img
                  className="min-w-full hover:scale-95 duration-200 ease-in aspect-video object-cover rounded-xl"
                  src={post?.url}
                  alt={post?.title}
                />

                <div className="flex items-center py-2 gap-2.5">
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
                </div>
              </div>
              <ReactMarkdown
                className="pt-6 font-normal leading-5 sm:leading-6 lg:leading-8 text-xs sm:text-sm text-left md:px-20"
                children={
                  post.content.length > 230
                    ? post.content.slice(0, 230) + "... &nbsp;&nbsp; Read more"
                    : post.content
                }
              />
            </div>
          ))}
          <div className="text-left md:px-20 flex flex-col">
            <h1 className="text-xs font-medium pt-20 pb-10">
              Recent Publications
            </h1>
            <div className="flex flex-col pb-16 gap-12">
              {props.feed.slice(1, props.feed.length).map((post) => (
                <div key={post?.id} className="post">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post?.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  try {
    const feed = await prisma.post?.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return {
      props: { feed },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return {
      props: { feed: [] }, // or some default value
      revalidate: 10,
    };
  }
};
