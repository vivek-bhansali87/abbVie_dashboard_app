import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Favorite, User } from "@/types";

const getCurrentUserId = (): string | null => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      const user: User = JSON.parse(userString);
      return user.id;
    }
  }

  return null;
};

async function fetchFavorites(): Promise<Favorite[]> {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error("No user selected");
  }
  const response = await fetch(`/api/favorites?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
}

async function toggleFavorite(kpiId: string): Promise<void> {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new Error("No user selected");
  }
  const response = await fetch("/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, kpiId }),
  });
  if (!response.ok) {
    throw new Error("Failed to toggle favorite");
  }
}

export function useFavorites() {
  const queryClient = useQueryClient();

  const { data } = useQuery<Favorite[], Error>({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
  });

  const mutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    data,
    toggleFavorite: mutation.mutate,
  };
}
