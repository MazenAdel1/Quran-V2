"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteBookmark } from "@/lib/redux/bookmarks/bookmarksSlice";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

export default function DeleteBookmark({ page }: { page: number }) {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant={"destructive"}
      onClick={() => dispatch(deleteBookmark({ page }))}
      className="relative h-full rounded-md lg:px-2 xl:px-4"
    >
      <X color="black" size="1.5rem" />
    </Button>
  );
}
