export default function BlogDetailPlaceholder() {
  return (
    <div className="max-w-3xl p-4 mx-auto space-y-6 animate-pulse">
      <div className="w-3/4 h-8 bg-gray-300 rounded dark:bg-gray-700" />

      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-700" />
        <div className="w-24 h-4 bg-gray-300 rounded dark:bg-gray-700" />
      </div>

      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-xl" />

      <div className="mt-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="w-5/6 h-4 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="w-2/3 h-4 bg-gray-300 rounded dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
