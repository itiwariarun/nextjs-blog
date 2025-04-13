// pages/auth/signin.js
import { getProviders, signIn } from "next-auth/react";
import Layout from "@components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { GithubIcon } from "@components/Icons";
import { useRouter } from "next/router";
export default function SignIn({ providers }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const SignInFunc = (id) => {
    signIn(id, { callbackUrl: "/drafts" });
    router.push("/drafts");
    router.reload();
  };
  return (
    <Layout>
      {session ? (
        <div className="flex flex-col min-h-[50vh] gap-5 text-xl font-medium text-gray-700 dark:text-gray-400">
          <p>{session.user.name}</p>
          <Link href="/create">
            <button className="max-w-fit">New post</button>
          </Link>
          <button className="max-w-fit" onClick={() => signOut()}>
            Log out
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-300 md:text-xl">
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
                    onClick={() => SignInFunc(provider.id)}
                    className="flex items-center w-full p-3 text-base font-bold text-gray-900 rounded-lg dark:text-gray-300 bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500"
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
