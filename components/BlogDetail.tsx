import { FC } from "react";
import { PostProps, SectionTypes } from "@components/Post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CodeBlock } from "@components/CodeSection";
import HtmlRenderer from "@components/HtmlRenderer";
import Image from "next/image";
import BlogDetailPlaceholder from "./BlogDetailPlaceholder";
import Publish from "./Publish";
import Delete from "./Delete";
import Edit from "./Edit";
const BlogDetail: FC<PostProps> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <BlogDetailPlaceholder />;
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props?.author?.email;
  const draftTitle = props?.published ? "" : " (Draft)";
  const title = props?.title + draftTitle;

  const data =
    typeof props.content === "string"
      ? JSON.parse(props.content)
      : props.content;
  return (
    <>
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
          <Publish id={props?.id} />
        )}
        {userHasValidSession && postBelongsToUser && <Delete id={props?.id} />}
        {userHasValidSession && postBelongsToUser && (
          <Edit id={props?.id} published={props?.published} />
        )}
      </div>
    </>
  );
};
export default BlogDetail;
