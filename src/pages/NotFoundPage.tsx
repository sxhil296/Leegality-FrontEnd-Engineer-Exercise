import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32 px-4 text-center">
      <span className="text-6xl font-bold text-gray-200">404</span>
      <h1 className="text-xl font-semibold text-gray-700">Page not found</h1>
      <p className="text-sm text-gray-500">
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{pathname}</code> doesn't exist.
      </p>
      <Link to="/" className="mt-2 text-sm text-blue-600 hover:underline">
        ← Back to products
      </Link>
    </div>
  );
}
