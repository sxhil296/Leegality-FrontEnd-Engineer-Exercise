import { useState } from "react";
import Pagination from "./Pagination";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 shrink-0 w-full">
      <div className="flex items-center justify-center h-150 bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={images[active]}
          alt={`${title} ${active + 1}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <Pagination
        page={active + 1}
        totalPages={images.length}
        onChange={(p) => setActive(p - 1)}
      />
    </div>
  );
}
