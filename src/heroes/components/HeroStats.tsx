import { Badge } from "@/components/ui/badge";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import { use } from "react";

export const HeroStats = () => {
  const { favoriteCount } = use(FavoriteHeroContext);
  const { data: summary } = useHeroSummary();

  const favoritePorcent = (favoriteCount / Number(summary?.totalHeroes) * 100)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <HeroStatCard
          title="Favoritos"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="secondary" className="text-xs">
              {summary?.heroCount} Heroes
            </Badge>
            <Badge variant="destructive" className="text-xs">
              {summary?.villainCount} Villains
            </Badge>
          </div>
        </HeroStatCard>

        <HeroStatCard
          title="Favoritos"
          icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
          <p className="text-xs text-muted-foreground">{favoritePorcent}% del Total</p>
        </HeroStatCard>

        <HeroStatCard
          title="Más fuerte"
          icon={<Zap className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold text-black">
            {summary?.strongestHero.alias}
          </div>
          <p className="text-xs text-muted-foreground">
            Fuerza: {summary?.strongestHero.strength}/10
          </p>
        </HeroStatCard>
        <HeroStatCard
          title="Más inteligente"
          icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold text-black">
            {summary?.smartestHero.alias}
          </div>
          <p className="text-xs text-muted-foreground">
            Inteligencia {summary?.smartestHero.intelligence}/10
          </p>
        </HeroStatCard>
      </div>
    </>
  );
};
