import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import TechStack from "@/components/sections/TechStack";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, projects] = await Promise.all([
    db.siteContent.findUnique({ where: { id: "singleton" } }),
    db.project.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero
          eyebrow={content?.heroEyebrow ?? ""}
          line1={content?.heroLine1 ?? ""}
          line2={content?.heroLine2 ?? ""}
          subhead={content?.heroSubhead ?? ""}
        />
        <Services />
        <Process />
        <Portfolio
          cases={projects.map((p) => ({
            id: p.slug,
            title: p.title,
            description: p.description,
            tags: p.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
            image: p.image,
            link: p.link ?? undefined,
            featured: p.featured,
          }))}
        />
        <TechStack />
        <CTA
          eyebrow={content?.ctaEyebrow ?? ""}
          headingStart={content?.ctaHeadingStart ?? ""}
          headingEnd={content?.ctaHeadingEnd ?? ""}
          subhead={content?.ctaSubhead ?? ""}
          contactEmail={content?.contactEmail ?? ""}
        />
      </main>
      <Footer
        email={content?.contactEmail ?? ""}
        socials={{
          github: content?.socialGithub ?? "",
          linkedin: content?.socialLinkedin ?? "",
          twitter: content?.socialTwitter ?? "",
          instagram: content?.socialInstagram ?? "",
        }}
      />
    </>
  );
}
