import dynamic from "next/dynamic";
const BlogDetail = dynamic(() => import("@components/BlogDetail"), {
  loading: () => <BlogDetailPlaceholder />,
});
import BlogDetailPlaceholder from "@components/BlogDetailPlaceholder";
import { Suspense } from "react";
import Layout from "@components/Layout";
import prisma from "@lib/prisma";
import { GetServerSideProps } from "next";
import { PostProps } from "@components/Post";
import { FC } from "react";

const Post: FC<PostProps> = (props) => {
  return (
    <Layout>
      <Suspense fallback={<BlogDetailPlaceholder />}>
        <BlogDetail {...props} />
      </Suspense>
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
