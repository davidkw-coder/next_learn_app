export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Next.js Dashboard
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Welcome to my Next.js learning project.
        </p>

        <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </main>
  );
}