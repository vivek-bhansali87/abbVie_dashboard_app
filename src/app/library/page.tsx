import { Suspense } from "react";
import LibraryPage from "@/components/LibraryPage/LibraryPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryPage />
    </Suspense>
  );
}
