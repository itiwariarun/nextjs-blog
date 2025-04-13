import { useEffect, FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data, status } = useSession();
  const [session, setSession] = useState<any>();
  useEffect(() => {
    setSession(data);
  }, [data]);
  return (
    <nav className="flex max-w-4xl w-full mx-auto items-center justify-between pt-12">
      <div className="flex font-medium text-lg md:text-xl text-gray-900 dark:text-gray-300 gap-x-2.5 md:gap-x-5 items-center">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        {session && (
          <Link href="/drafts">
            <a data-active={isActive("/drafts")}>My drafts</a>
          </Link>
        )}
      </div>
      {session ? (
        <div className="flex gap-x-2.5 md:gap-x-5 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 items-center">
          <p>{session?.user?.name}</p>
          <Link href="/create">
            <button>
              <a>New post</a>
            </button>
          </Link>
          <button onClick={() => signOut()}>
            <a>Log out</a>
          </button>
          <ThemeSwitcher />
        </div>
      ) : (
        <div className="flex right items-center whitespace-nowrap gap-x-2.5">
          <Link href="/auth/signin">
            <a data-active={isActive("/signup")}>Log in</a>
          </Link>
          <ThemeSwitcher />
        </div>
      )}
    </nav>
  );
};

export default Header;
