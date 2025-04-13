import { useRouter } from "next/router";

export default function Publish({ id }: { id: string }) {
  const router = useRouter();

  const publishPost = async (id: string) => {
    try {
      await fetch(`/api/publish/${id}`, {
        method: "PUT",
      });
      router.push("/");
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };
  return (
    <button
      type="submit"
      onClick={() => publishPost(id)}
      className="block w-full rounded-md bg-indigo-600 max-w-40 px-3.5 py-2.5 text-center text-sm border border-indigo-600 font-semibold text-indigo-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Publish
    </button>
  );
}
