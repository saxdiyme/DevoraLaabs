import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.siteContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      heroEyebrow: "IT Product Studio · Kronyx Group",
      heroLine1: "We Build Digital",
      heroLine2: "Products That Scale",
      heroSubhead:
        "From mobile apps and SaaS platforms to AI-powered automation — we partner with startups and enterprises to ship software that compounds revenue and trust.",
      ctaEyebrow: "Start the conversation",
      ctaHeadingStart: "Ready to build",
      ctaHeadingEnd: "something great?",
      ctaSubhead: "Tell us about your project — we respond within 24h.",
      contactEmail: "hello@devoralabs.io",
      contactPhone: null,
      socialGithub: "https://github.com/",
      socialLinkedin: "https://linkedin.com/",
      socialTwitter: "https://x.com/",
      socialInstagram: "https://instagram.com/",
    },
  });

  const projects = [
    {
      slug: "case-1",
      title: "[PROJECT NAME]",
      description: "[SHORT DESCRIPTION — 2-3 sentences]",
      tags: "[Platform],[Tech 1],[Tech 2]",
      image: "/cases/case-1.jpg",
      link: "https://[LIVE-URL]",
      featured: true,
      order: 0,
    },
    {
      slug: "case-2",
      title: "[PROJECT NAME]",
      description: "[SHORT DESCRIPTION — 2-3 sentences]",
      tags: "[Platform],[Tech 1],[Tech 2]",
      image: "/cases/case-2.jpg",
      link: "https://[LIVE-URL]",
      featured: false,
      order: 1,
    },
    {
      slug: "case-3",
      title: "[PROJECT NAME]",
      description: "[SHORT DESCRIPTION — 2-3 sentences]",
      tags: "[Platform],[Tech 1],[Tech 2]",
      image: "/cases/case-3.jpg",
      link: "https://[LIVE-URL]",
      featured: false,
      order: 2,
    },
  ];

  for (const p of projects) {
    await db.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
