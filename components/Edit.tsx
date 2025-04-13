import { useRouter } from "next/router";

export default function Edit({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const router = useRouter();

  return (
    <button
      type="submit"
      onClick={() => router.push(`/edit/${id}`)}
      className={`block w-full rounded-md max-w-40 hover:bg-indigo-50   px-3.5 py-2.5 text-center text-sm font-semibold ${
        published
          ? "border-indigo-600  border bg-indigo-600 text-indigo-50"
          : " hover:bg-indigo-50/40  text-indigo-600"
      } hover:text-indigo-500 shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      Edit
    </button>
  );
}
