import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Post: React.FC<PostProps> = (props) => {
  const router = useRouter();
  async function publishPost(id: string): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: "PUT",
    });
    await router.push("/");
  }
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }
  async function deletePost(id: string): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }
  return (
    <Layout>
      <div className="flex flex-col sm:text-center sm:items-center">
        <h2 className="max-w-2xl pb-4 mx-auto text-2xl sm:text-3xl lg:text-5xl sm:pb-8">
          {props.title}
        </h2>
        <ReactMarkdown className="max-w-2xl pb-6 text-base font-normal sm:pb-12 md:text-xl">
          {props?.summary}
        </ReactMarkdown>
        <img
          className="object-cover min-w-full aspect-video rounded-xl"
          src={props?.url}
          alt={props?.title}
        />
        <div className="flex items-center py-2.5 gap-2.5">
          <img
            className="object-cover rounded-full size-6"
            src={
              props?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0V_aHE12tdUfBMu2ZvPg-eCfzXDh8B8Zx3xzI2NukeQ&s"
            }
            alt={props?.author ? props?.author.name : "Unknown author"}
          />
          <small className="py-2">
            By {props?.author ? props?.author.name : "Unknown author"}
          </small>
        </div>
      </div>
      <ReactMarkdown className="pt-4 text-xs font-normal leading-5 text-left sm:pt-6 sm:leading-8 sm:text-sm">
        {props?.content}
      </ReactMarkdown>
      <div
        className={`flex items-center gap-4 mt-10 ml-auto ${
          props.published ? "flex-row-reverse" : "justify-end"
        }`}
      >
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button
            type="submit"
            onClick={() => publishPost(props.id)}
            className="block w-full rounded-md bg-indigo-600 max-w-40 px-3.5 py-2.5 text-center text-sm border border-indigo-600 font-semibold text-indigo-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Publish
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button
            type="submit"
            onClick={() => deletePost(props.id)}
            className="block w-full rounded-md bg-indigo-50/40 max-w-40 hover:bg-indigo-50 border text-indigo-600 border-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold hover:text-indigo-500 shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button
            type="submit"
            onClick={() => router.push(`/edit/${props.id}`)}
            className={`block w-full rounded-md max-w-40 hover:bg-indigo-50  text-indigo-600  px-3.5 py-2.5 text-center text-sm font-semibold ${
              props.published
                ? "border-indigo-600  border bg-indigo-600 text-indigo-50"
                : " hover:bg-indigo-50/40  text-indigo-600"
            } hover:text-indigo-500 shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            Edit
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};
