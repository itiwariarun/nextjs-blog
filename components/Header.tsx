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
    <nav className="flex items-center justify-between w-full max-w-4xl pt-12 mx-auto">
      <div className="flex font-medium text-lg md:text-xl text-gray-900 dark:text-gray-300 gap-x-2.5 md:gap-x-5 items-center">
        <Link className="bold" data-active={isActive("/")} href="/">
          Feed
        </Link>
        {!!session?.accessToken && (
          <Link data-active={isActive("/drafts")} href="/drafts">
            My drafts
          </Link>
        )}
      </div>
      {!!session?.accessToken ? (
        <div className="flex gap-x-2.5 md:gap-x-5 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 items-center">
          <p>{session?.user?.name}</p>
          <Link href="/create">
            <button>New post</button>
          </Link>
          <button onClick={() => signOut()}>Log out</button>
          <ThemeSwitcher />
        </div>
      ) : (
        <div className="flex right items-center whitespace-nowrap gap-x-2.5">
          <Link data-active={isActive("/signup")} href="/auth/signin">
            Log in
          </Link>
          <ThemeSwitcher />
        </div>
      )}
    </nav>
  );
};

export default Header;
