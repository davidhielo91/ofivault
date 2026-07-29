import { CatalogClient } from "@/components/catalog-client";
import { getInstallers } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const installers = await getInstallers();
  return <CatalogClient installers={installers} />;
}
