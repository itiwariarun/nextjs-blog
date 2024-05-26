import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between pt-12">
      <div className="flex font-medium text-lg md:text-xl text-gray-900 gap-x-2.5 md:gap-x-5 items-center">
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
        <div className="flex gap-x-2.5 md:gap-x-5 text-xs sm:text-sm font-medium text-gray-700 items-center">
          <p>{session.user.name}</p>
          <Link href="/create">
            <button>
              <a>New post</a>
            </button>
          </Link>
          <button onClick={() => signOut()}>
            <a>Log out</a>
          </button>
        </div>
      ) : (
        <div className="right">
          <Link href="/auth/signin">
            <a data-active={isActive("/signup")}>Log in</a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
