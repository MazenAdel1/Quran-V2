import List from "@/components/list/List";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<h2>تحميل البيانات...</h2>}>
      <List />
    </Suspense>
  );
}
