import { useRouter } from "next/router";

export default function Delete({ id }: { id: string }) {
  const router = useRouter();

  const deletePost = async (id: string) => {
    try {
      await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <button
      type="submit"
      onClick={() => deletePost(id)}
      className="block w-full rounded-md bg-indigo-50 max-w-40 hover:bg-indigo-50 border text-indigo-600 border-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold hover:text-indigo-500 shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Delete
    </button>
  );
}
