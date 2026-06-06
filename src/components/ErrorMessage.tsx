import { Link } from "react-router-dom";

interface Props {
  message: string;
  backLink?: { to: string; label: string };
  className?: string;
}

export default function ErrorMessage({ message, backLink, className = "py-20" }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <p className="text-red-500 text-sm">{message}</p>
      {backLink && (
        <Link to={backLink.to} className="text-blue-600 text-sm hover:underline">
          {backLink.label}
        </Link>
      )}
    </div>
  );
}
