import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ProductShowcase } from "@/components/ProductShowcase";
import { FAQs } from "@/components/FAQs";
import { CallToAction } from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <ProductShowcase />
      <FAQs />
      <CallToAction />
    </>
  );
}
