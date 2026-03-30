import { use, useMemo } from "react";
import { Heart } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {
  const { favoriteCount, favorites } = use(FavoriteHeroContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  // const [activeTab, setaAtiveTab] = useState<
  //   "all" | "favorites" | "heroes" | "villains"
  // >("all");

  // const { data: heroesResponse } = useQuery({
  //   queryKey: ["heroes", { page: page, limit: limit }],
  //   queryFn: () => getHeroByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5, //5min
  // });

  const { data: heroesResponse } = usePaginateHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  // useEffect(() => {
  //   getHeroByPage().then();
  // }, []);

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra super héroes y villanos "
        />
        {/* Breadcrumbs */}
        <CustomBreadcrumbs CurrentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}

        {/* Advanced Filters */}

        {/* Tabs */}
        <Tabs value={selectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              onClick={() => {
                // setSearchParams({ tab: "all" });
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");

                  return prev;
                });
              }}
              value="all"
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  return prev;
                });
              }}
              value="favorites"
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");

                  return prev;
                });
              }}
              value="heroes"
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");

                  return prev;
                });
              }}
              value="villains"
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes*/}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />

            {/* aqui */}
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}

        {/* Pagination */}
              {
                selectedTab !== 'favorites' &&(

                  <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
                )
              }

      </>
    </>
  );
};
