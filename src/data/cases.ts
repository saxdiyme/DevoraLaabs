/**
 * Devora Laabs · Case Studies
 *
 * Adding a new case is as simple as adding one object to the `cases`
 * array — the Portfolio grid updates automatically. Set `featured: true`
 * on the project you want to highlight in the large bento slot.
 *
 * Drop the project's hero image at `/public/cases/[id].jpg`.
 */

export interface Case {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  featured?: boolean;
}

export const cases: Case[] = [
  {
    id: "case-1",
    title: "[PROJECT NAME]",
    description: "[SHORT DESCRIPTION — 2-3 sentences]",
    tags: ["[Platform]", "[Tech 1]", "[Tech 2]"],
    image: "/cases/case-1.jpg",
    link: "https://[LIVE-URL]",
    featured: true,
  },
  {
    id: "case-2",
    title: "[PROJECT NAME]",
    description: "[SHORT DESCRIPTION — 2-3 sentences]",
    tags: ["[Platform]", "[Tech 1]", "[Tech 2]"],
    image: "/cases/case-2.jpg",
    link: "https://[LIVE-URL]",
    featured: false,
  },
  {
    id: "case-3",
    title: "[PROJECT NAME]",
    description: "[SHORT DESCRIPTION — 2-3 sentences]",
    tags: ["[Platform]", "[Tech 1]", "[Tech 2]"],
    image: "/cases/case-3.jpg",
    link: "https://[LIVE-URL]",
    featured: false,
  },
  // ← ADD NEW CASES HERE — the grid updates automatically
];

/**
 * A case is considered an unfilled placeholder if its title or any
 * tag still uses the [BRACKET] marker. The Portfolio renders these
 * as "Coming Soon" cards instead of broken images.
 */
export function isPlaceholder(c: Case): boolean {
  return (
    c.title.trim().startsWith("[") ||
    c.tags.some((t) => t.trim().startsWith("[")) ||
    (c.link ?? "").includes("[LIVE-URL]")
  );
}
