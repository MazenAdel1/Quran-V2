import List from "@/components/list/List";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <List />
    </Suspense>
  );
}
