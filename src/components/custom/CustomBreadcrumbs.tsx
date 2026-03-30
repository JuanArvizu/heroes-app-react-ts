import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

interface Breadcrumbs {
  label: string;
  to: string;
}

interface Props {
  CurrentPage: string;
  breadcrumbs?: Breadcrumbs[];
}

export const CustomBreadcrumbs = ({ CurrentPage, breadcrumbs = [] }: Props) => {
  return (
    <div className="mb-4 " >
      <Breadcrumb className="text-black">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbs.map((crumb) => (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={crumb.to}>{crumb.label}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          ))}

          <BreadcrumbItem>
            <BreadcrumbLink>{CurrentPage}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
