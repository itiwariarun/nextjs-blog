import { useState, FC } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import Image from "next/image";
type Props = {
  feed: PostProps[];
};

const Blog: FC<Props> = (props) => {
  const router = useRouter();
  const [counts, setCounts] = useState(10);
  const viewMore = () => {
    props.feed.length > counts ? setCounts((prevCount) => prevCount + 10) : "";
  };
  return (
    <Layout>
      <div className="page">
        <h1 className="pb-10 text-4xl font-semibold text-center sm:text-5xl lg:text-8xl md:pb-20">
          Public Feed
        </h1>
        <main>
          {props.feed.slice(0, 1).map((post) => (
            <div key={post?.id} className="cursor-pointer post">
              <div
                className="flex flex-col items-center sm:text-center"
                onClick={() => router.push("/p/[id]", `/p/${post?.id}`)}
              >
                <h2 className="max-w-2xl pb-8 mx-auto text-2xl sm:text-3xl lg:text-5xl">
                  {post?.title}
                </h2>
                <ReactMarkdown className="max-w-2xl pb-12 text-base font-normal md:text-xl">
                  {post?.summary}
                </ReactMarkdown>
                <div className="relative w-full h-full rounded-xl aspect-video">
                  <Image
                    className="object-cover min-w-full duration-200 ease-in hover:scale-95 aspect-video rounded-xl"
                    src={post?.url}
                    alt={post?.title}
                    layout="fill"
                    objectFit="cover"
                    priority
                                                  quality={100}
                  />
                </div>
                <div className="flex items-center py-2 gap-2.5">
                  <div className="relative w-6 h-6 rounded-full">
                    {" "}
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
                </div>
              </div>
              <ReactMarkdown className="pt-6 text-xs font-normal leading-5 text-left sm:leading-6 lg:leading-8 sm:text-sm md:px-20">
                {JSON.parse(post?.content)?.summary.length > 230
                  ? JSON.parse(post?.content)?.summary.slice(0, 230) +
                    "... &nbsp;&nbsp; Read more"
                  : JSON.parse(post?.content)?.summary}
              </ReactMarkdown>
            </div>
          ))}
          <div className="flex flex-col text-left md:px-20">
            <h1 className="pt-20 pb-10 text-xs font-medium">
              Recent Publications
            </h1>
            <div className="flex flex-col gap-12 pb-16">
              {props.feed.slice(1, counts).map((post) => (
                <div key={post?.id} className="post">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
          {props.feed.length > 10 && (
            <div className="max-w-xs mx-auto my-5">
              <button
                className="bg-gray-100 dark:bg-gray-800 border p-2.5 rounded-lg text-xs md:text-sm font-medium text-gray-700 dark:text-gray-400 min-w-full border-gray-100 dark:border-gray-800"
                onClick={viewMore}
              >
                View More
              </button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post?.findMany({
    where: { published: true, inPortfolio: false },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  try {
    const feed = await prisma.post?.findMany({
      where: { published: true, inPortfolio: false, showOnHomePage: true },
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
