import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CodeBlock } from "./../../components/CodeSection";
import HtmlRenderer from "./../../components/HtmlRenderer";
import Image from "next/image";
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
const Post: React.FC<PostProps> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props?.author?.email;
  const draftTitle = props?.published ? "" : " (Draft)";
  const title = props?.title + draftTitle;

  const publishPost = async (id) => {
    try {
      await fetch(`/api/publish/${id}`, {
        method: "PUT",
      });
      router.push("/");
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const data = JSON?.parse(`${props?.content}`);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:text-center sm:items-center">
          <h1 className="max-w-3xl pb-4 mx-auto text-2xl sm:text-3xl lg:text-5xl sm:pb-8">
            {title}
          </h1>
          {props?.url && (
            <Image
              className="object-cover min-w-full aspect-video rounded-xl"
              src={props.url}
              alt={props.title}
              width={600}
              height={400}
            />
          )}
        </div>

        <div className="flex flex-col gap-6 py-10">
          {data?.sections?.map((section: SectionTypes, index: number) => (
            <section className="flex flex-col gap-2" key={index}>
              <h2 className="text-2xl font-bold">{section?.heading}</h2>

              {section?.content && (
                <p className="text-sm font-normal leading-5">
                  <HtmlRenderer htmlContent={section?.content} />
                </p>
              )}
              {section?.description && (
                <p className="text-sm font-normal leading-5">
                  {section?.description}
                </p>
              )}
              {section?.steps && (
                <ol className="flex flex-col gap-2.5">
                  {section?.steps?.map((step) => (
                    <li
                      key={step?.step}
                      className="font-normal leading-5 text-sm flex flex-col gap-0.5"
                    >
                      <p>
                        <strong>Step {step?.step}:</strong> {step?.description}
                      </p>
                      <CodeBlock
                        language="command"
                        highlightLines={[9, 13, 14, 18]}
                        code={step?.command}
                      />
                    </li>
                  ))}
                </ol>
              )}

              {section?.code && (
                <CodeBlock
                  language={section?.code?.language}
                  highlightLines={[9, 13, 14, 18]}
                  code={section?.code?.content}
                />
              )}

              {section?.example && (
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-semibold text-lg pb-0.5">
                      {section?.example?.component?.filename}
                    </h3>
                    <p className="text-sm font-normal leading-5">
                      <HtmlRenderer htmlContent={section?.content} />
                    </p>
                    {section?.example?.component?.code && (
                      <CodeBlock
                        language={section?.example?.component?.language}
                        highlightLines={[9, 13, 14, 18]}
                        filename={section?.example?.component?.filename}
                        code={section?.example?.component?.code}
                      />
                    )}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
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
            className="block w-full rounded-md bg-indigo-50 max-w-40 hover:bg-indigo-50 border text-indigo-600 border-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold hover:text-indigo-500 shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button
            type="submit"
            onClick={() => router.push(`/edit/${props.id}`)}
            className={`block w-full rounded-md max-w-40 hover:bg-indigo-50   px-3.5 py-2.5 text-center text-sm font-semibold ${
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
      inPortfolio: false,
      showOnHomePage: true,
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
