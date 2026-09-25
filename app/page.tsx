import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Photos } from "@/components/Photos";
import { Shop } from "@/components/Shop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPhotoById } from "@/data/photos";
import { getCommerceProvider } from "@/lib/commerce";

type HomePageProps = {
  readonly searchParams: Promise<{
    readonly print?: string | readonly string[];
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const products = await getCommerceProvider().listProducts();
  const params = await searchParams;
  const printId = typeof params.print === "string" ? params.print : undefined;
  const selectedPhoto = getPhotoById(printId);

  return (
    <>
      <SiteHeader />
      <Hero />
      <Manifesto />
      <Shop products={products} />
      <Photos />
      <Contact key={selectedPhoto?.id ?? "general"} selectedPhoto={selectedPhoto} />
      <SiteFooter />
    </>
  );
}
