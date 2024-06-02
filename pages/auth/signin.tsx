// pages/auth/signin.js
import { getProviders, signIn } from "next-auth/react";
import Layout from "./../../components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { GithubIcon } from "../../components/Icons";
export default function SignIn({ providers }) {
  const { data: session, status } = useSession();

  return (
    <Layout>
      {session ? (
        <div className="flex flex-col min-h-[50vh] gap-5 text-xl font-medium text-gray-700 dark:text-gray-400">
          <p>{session.user.name}</p>
          <Link href="/create">
            <button className="max-w-fit">
              <a>New post</a>
            </button>
          </Link>
          <button className="max-w-fit" onClick={() => signOut()}>
            <a>Log out</a>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-300 md:text-xl dark:text-white">
            Connect To Github
          </h5>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Connect with available account
          </p>
          <ul className="mt-6 mb-4 space-y-3">
            {Object.values(providers).map(
              (provider: { name: string; id: string }) => (
                <li key={provider.name}>
                  <button
                    onClick={() => signIn(provider.id)}
                    className="flex items-center w-full p-3 text-base font-bold text-gray-900 dark:text-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <GithubIcon />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {" "}
                      Sign in with {provider.name}
                    </span>
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
