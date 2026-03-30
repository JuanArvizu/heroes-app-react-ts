import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { SearchHero } from "@/heroes/actions/search-hero.action";
import {  useSearchParams } from "react-router";


export const SearchPage = () => {
 const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  console.log(name)
  
  // //TODO: useQuery
  const { data: hero = [] } = useQuery({
    queryKey: ["hero",{name, strength}],
    queryFn: () => SearchHero({name, strength} ) ,
    staleTime:1000*60*5
  });
  console.log(hero)

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra super héroes y villanos "
      />
      {/* BreadCrumbs */}
      <CustomBreadcrumbs
        CurrentPage="Buscar"
        // breadcrumbs={[
        //   { label: "Home", to: "/" },
        //   { label: "Home2", to: "/" },
        // ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />

      {/* Grid */}
      <HeroGrid heroes={hero ?? []} />
    </>
  );
};

export default SearchPage;
