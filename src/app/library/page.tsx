import { Suspense } from "react";
import LibraryPage from "@/components/LibraryPage/LibraryPage";
import { getFeaturedKPIs, getTrendingKPIs } from "@/lib/db/kpi";

export default async function Page() {
  const featuredKPIs = await getFeaturedKPIs();
  const trendingKPIs = await getTrendingKPIs();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryPage featuredKPIs={featuredKPIs} trendingKPIs={trendingKPIs} />
    </Suspense>
  );
}
