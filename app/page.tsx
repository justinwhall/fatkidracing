import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Shop } from "@/components/Shop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCommerceProvider } from "@/lib/commerce";

export default async function HomePage() {
  const products = await getCommerceProvider().listProducts();

  return (
    <>
      <SiteHeader />
      <Hero />
      <Manifesto />
      <Shop products={products} />
      <SiteFooter />
    </>
  );
}
