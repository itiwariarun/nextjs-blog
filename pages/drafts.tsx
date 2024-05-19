import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

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
        <h1 className="text-center text-8xl font-semibold pb-20">My Drafts</h1>
        <div>
          <p className="text-3xl font-medium">
            You need to be authenticated to view this page.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="text-center text-4xl sm:text-5xl lg:text-8xl font-semibold pb-12 md:pb-24">
          My Drafts
        </h1>
        <main>
          <div className="flex flex-col pb-16 gap-12">
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
