// components/EditPost.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useReducer } from "react";
import Layout from "./../../components/Layout";
import prisma from "./../../lib/prisma";
import { GetServerSideProps } from "next";
import { SyntheticEvent } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_URL":
      return { ...state, url: action.payload };
    case "SET_SUMMARY":
      return { ...state, summary: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    default:
      return state;
  }
};
const EditPost = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    title: props.title,
    url: props.url,
    summary: props.summary,
    content: props.content,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };
  const router = useRouter();
  const session = useSession();
  const email = session?.data?.user?.email;
  const image = session?.data?.user?.image;
  const { title, url, summary, content } = state;

  const editPost = async (e: SyntheticEvent) => {
    e.preventDefault();
    router.back();
    try {
      const body = { title, content, email, url, summary, image };
      await fetch(`/api/post/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="px-6">
        <div className="flex flex-col max-w-2xl gap-5 mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Edit Post
          </h1>
          <h2 className="max-w-2xl pb-4 mx-auto text-xl sm:text-3xl lg:text-2xl sm:pb-8">
            {props.title}
          </h2>
        </div>
        <form onSubmit={editPost} className="max-w-xl mx-auto mt-16 sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  autoFocus
                  onChange={handleChange}
                  placeholder="Title"
                  value={state.title}
                  name="title"
                  id="title"
                  autoComplete="given-title"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Image Url
              </label>
              <div className="mt-2.5">
                <input
                  autoFocus
                  onChange={handleChange}
                  placeholder="URL"
                  value={state.url}
                  type="url"
                  name="url"
                  id="url"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="summary"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Summary
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  autoFocus
                  onChange={handleChange}
                  placeholder="Summary"
                  value={state.summary}
                  name="summary"
                  id="summary"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="content"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2.5">
                <textarea
                  name="content"
                  id="content"
                  cols={50}
                  onChange={handleChange}
                  placeholder="Content"
                  value={state.content}
                  rows={8}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <button
              type="submit"
              disabled={!state.content || !state.title}
              className="block w-full rounded-md bg-indigo-600 disabled:cursor-not-allowed px-3.5 py-2.5 text-center text-sm border border-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Post
            </button>
            <button
              type="submit"
              onClick={() => router.back()}
              className="block w-full rounded-md bg-indigo-50/40 hover:bg-indigo-50 border text-indigo-600 border-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold hover:text-indigo-500 shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>
          </div>{" "}
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;
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
