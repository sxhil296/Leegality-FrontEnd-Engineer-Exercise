import { useState, useEffect } from "react";
import { Menu, Search, ShoppingCart, Globe, User } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";

export default function Header() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    params.set("page", "1");
    navigate(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#2d3748] px-4 sm:px-8 md:px-12 h-16 flex items-center gap-2 sm:gap-4">
      <Button
        variant="ghost"
        icon={<Menu size={22} />}
        aria-label="Open menu"
        className="text-white shrink-0"
      />

      <div className="flex-1 flex justify-center">
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-1.5 rounded-md bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-6 shrink-0 text-white">
        <Button
          variant="ghost"
          icon={<ShoppingCart size={22} />}
          aria-label="Cart"
        />
        <Button
          variant="ghost"
          icon={<Globe size={22} />}
          aria-label="Language"
          className="hidden sm:flex"
        />
        <Button
          variant="ghost"
          icon={<User size={22} />}
          aria-label="Profile"
          className="hidden sm:flex"
        />
      </div>
    </header>
  );
}
