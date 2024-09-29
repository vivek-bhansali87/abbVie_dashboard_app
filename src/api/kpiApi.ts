import { useQuery } from "@tanstack/react-query";

export const useKPIs = (search: string = "", featured: boolean = false) => {
  return useQuery(["kpis", search, featured], async () => {
    const response = await fetch(
      `/api/kpis?search=${search}&featured=${featured}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
