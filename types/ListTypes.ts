import { buttonProps } from "@/types/ChapterTypes";

export type JuzsProps = {
  id: number;
  page: number;
  title: string;
};

export type BookmarksProps = {
  page: number;
};

export type ListProps = {
  container?: boolean;
  grid?: number;
  filterAndSearchLayout?: "row" | "col";
  chapterButtonProps?: buttonProps;
  sheet?: boolean;
  sheetTriggerIcon?: any;
};
