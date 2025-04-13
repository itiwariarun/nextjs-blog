import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "@components/Layout";
import Post, { PostProps } from "@components/Post";
import prisma from "@lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
      inPortfolio: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Layout>
        <h1 className="pb-20 font-semibold text-center text-8xl">My Drafts</h1>
        <div>
          <p className="text-3xl font-medium text-center">
            You need to be authenticated to view this page.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="pb-12 text-4xl font-semibold text-center sm:text-5xl lg:text-8xl md:pb-24">
          My Drafts
        </h1>
        <main>
          <div className="flex flex-col gap-12 pb-16">
            {props.drafts.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
