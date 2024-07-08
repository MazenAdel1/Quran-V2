"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addBookmark,
  deleteBookmark,
} from "@/lib/redux/bookmarks/bookmarksSlice";
import { useEffect, useRef } from "react";

export default function SaveBookmark({ page }: { page: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const bookmarks = useAppSelector((state) => state.bookmarks.value);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].page === page) {
        return (
          pathRef.current?.classList.add("fill-white"),
          pathRef.current?.classList.remove("fill-orange"),
          dispatch(deleteBookmark({ page }))
        );
      }
    }
    return (
      pathRef.current?.classList.add("fill-orange"),
      pathRef.current?.classList.remove("fill-white"),
      dispatch(addBookmark({ page }))
    );
  };

  useEffect(() => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].page === page) {
        return (
          pathRef.current?.classList.add("fill-orange"),
          pathRef.current?.classList.remove("fill-white")
        );
      }
    }
    return (
      pathRef.current?.classList.add("fill-white"),
      pathRef.current?.classList.remove("fill-orange")
    );
  }, [page, bookmarks]);

  return (
    <button
      onClick={handleClick}
      className="absolute left-2 top-20 h-6 w-6 sm:left-6 sm:top-24"
    >
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V2z"
          fill="#ffffff"
          className="transition-all"
          ref={pathRef}
        ></path>
      </svg>
    </button>
  );
}
