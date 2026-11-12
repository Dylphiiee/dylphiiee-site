import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Services />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
