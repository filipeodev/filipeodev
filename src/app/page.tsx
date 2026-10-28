import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Tagline } from "@/components/Tagline";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#servicos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Tagline />
        <Services />
        <HowItWorks />
        <Projects />
        <Stack />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
