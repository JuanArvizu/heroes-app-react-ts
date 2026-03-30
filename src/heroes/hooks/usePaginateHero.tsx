import { useQuery } from "@tanstack/react-query";
import { getHeroByPageAction } from "../actions/get-hero-by-page.action";

export const usePaginateHero = (page: number , limit: number , category :string = 'all') => {

  return useQuery({
    queryKey: ["heroes", { pages: page, limit: limit , category}],
    queryFn: () => getHeroByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5, //5min
  });
};
