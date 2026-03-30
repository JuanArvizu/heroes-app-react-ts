import { CustomMenu } from "@/components/custom/CustomMenu";
import { Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-300 via-blue-100 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <CustomMenu/>
        <Outlet/>
      </div>
    </div>
  );
};
