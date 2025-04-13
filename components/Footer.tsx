import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpIcon } from "./Icons";

export default function Footer() {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-5 pt-12">
        <div className="flex flex-col gap-y-5">
          <Link
            className="text-lg font-medium text-gray-900 dark:text-gray-300 md:text-xl"
            data-active={isActive("/")}
            href="/"
          >
            Feed
          </Link>
          <p className="text-base font-normal text-gray-600 dark:text-gray-300 md:text-lg">
            Developed By <span className="underline">itiwariarun</span>
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <a
            href="https://www.linkedin.com/in/itiwariarun/"
            className="flex items-center hover:underline underline-offset-2 gap-2.5 text-xs font-medium text-gray-700 dark:text-gray-400 md:text-sm"
          >
            Linkedin
            <ArrowUpIcon />
          </a>
          <a
            href="https://github.com/itiwariarun"
            className="flex items-center gap-2.5 hover:underline underline-offset-2 text-xs font-medium text-gray-700 dark:text-gray-400 md:text-sm"
          >
            Github
            <ArrowUpIcon />
          </a>
          <a
            href="https://www.instagram.com/itiwariarun?igsh=dDc3cXo4MTJtb3Mw"
            className="flex items-center gap-2.5 hover:underline underline-offset-2 text-xs font-medium text-gray-700 dark:text-gray-400 md:text-sm"
          >
            Instagram
            <ArrowUpIcon />
          </a>
        </div>
      </div>
      <hr className="mt-16 mb-10 border border-gray-200" />
      <div className="flex items-center justify-between gap-5 pb-10">
        <p className="text-xs font-normal text-gray-600 dark:text-gray-300 md:text-sm">
          © 2024 itiwariarun
        </p>
        <div className="flex items-center gap-5 text-xs font-normal text-gray-600 dark:text-gray-300 md:text-sm">
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
      </div>
    </div>
  );
}
