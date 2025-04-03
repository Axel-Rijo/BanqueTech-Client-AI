import { notFound } from "next/navigation";
import PlateDetailsPage from "@/components/menu/plate-details-page";
import { MenuLayout } from "@/components/menu/layout/menu-layout";
import { getDishDetails } from "@/lib/dish-data";

interface DishPageProps {
  params: {
    id: string;
  };
}

export default async function DishPage({ params }: DishPageProps) {
  const { id } = await params;
  const dish = getDishDetails(id);

  if (!dish) {
    notFound();
  }

  return (
    <MenuLayout>
      <PlateDetailsPage dish={dish} />
    </MenuLayout>
  );
}
