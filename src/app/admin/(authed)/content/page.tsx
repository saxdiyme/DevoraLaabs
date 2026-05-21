import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const content = await db.siteContent.findUnique({
    where: { id: "singleton" },
  });
  if (!content) {
    return (
      <p className="font-inter text-dl-muted">
        Run <code className="font-mono text-dl-peach">npm run db:setup</code> first.
      </p>
    );
  }

  async function save(formData: FormData) {
    "use server";
    await db.siteContent.update({
      where: { id: "singleton" },
      data: {
        heroEyebrow: String(formData.get("heroEyebrow") ?? ""),
        heroLine1: String(formData.get("heroLine1") ?? ""),
        heroLine2: String(formData.get("heroLine2") ?? ""),
        heroSubhead: String(formData.get("heroSubhead") ?? ""),
        ctaEyebrow: String(formData.get("ctaEyebrow") ?? ""),
        ctaHeadingStart: String(formData.get("ctaHeadingStart") ?? ""),
        ctaHeadingEnd: String(formData.get("ctaHeadingEnd") ?? ""),
        ctaSubhead: String(formData.get("ctaSubhead") ?? ""),
        contactEmail: String(formData.get("contactEmail") ?? ""),
        contactPhone: String(formData.get("contactPhone") ?? "") || null,
        socialGithub: String(formData.get("socialGithub") ?? "") || null,
        socialLinkedin: String(formData.get("socialLinkedin") ?? "") || null,
        socialTwitter: String(formData.get("socialTwitter") ?? "") || null,
        socialInstagram:
          String(formData.get("socialInstagram") ?? "") || null,
      },
    });
    revalidatePath("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-syne text-2xl font-bold text-dl-warm-white">
        Content
      </h1>
      <form action={save} className="flex flex-col gap-6">
        <Group title="Hero">
          <Field name="heroEyebrow" label="Eyebrow" defaultValue={content.heroEyebrow} />
          <Field name="heroLine1" label="Line 1 (gradient)" defaultValue={content.heroLine1} />
          <Field name="heroLine2" label="Line 2" defaultValue={content.heroLine2} />
          <Textarea name="heroSubhead" label="Subhead" defaultValue={content.heroSubhead} />
        </Group>
        <Group title="CTA">
          <Field name="ctaEyebrow" label="Eyebrow" defaultValue={content.ctaEyebrow} />
          <Field name="ctaHeadingStart" label="Heading start (warm white)" defaultValue={content.ctaHeadingStart} />
          <Field name="ctaHeadingEnd" label="Heading end (gradient)" defaultValue={content.ctaHeadingEnd} />
          <Textarea name="ctaSubhead" label="Subhead" defaultValue={content.ctaSubhead} />
        </Group>
        <Group title="Contact">
          <Field name="contactEmail" label="Email" defaultValue={content.contactEmail} />
          <Field name="contactPhone" label="Phone (optional)" defaultValue={content.contactPhone ?? ""} />
        </Group>
        <Group title="Socials">
          <Field name="socialGithub" label="GitHub URL" defaultValue={content.socialGithub ?? ""} />
          <Field name="socialLinkedin" label="LinkedIn URL" defaultValue={content.socialLinkedin ?? ""} />
          <Field name="socialTwitter" label="X (Twitter) URL" defaultValue={content.socialTwitter ?? ""} />
          <Field name="socialInstagram" label="Instagram URL" defaultValue={content.socialInstagram ?? ""} />
        </Group>
        <button
          type="submit"
          className="self-start rounded-full bg-dl-orange px-5 py-2.5 font-inter font-semibold text-dl-deep transition-colors hover:bg-dl-peach"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-3 border-t border-dl-navy/30 pt-4">
      <legend className="font-mono text-xs uppercase tracking-widest text-dl-peach">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inter text-xs font-medium text-dl-muted">{label}</span>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        className="rounded-md border border-dl-navy/40 bg-dl-deep px-3 py-2 font-inter text-sm text-dl-warm-white focus:border-dl-orange focus:outline-none"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inter text-xs font-medium text-dl-muted">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="resize-none rounded-md border border-dl-navy/40 bg-dl-deep px-3 py-2 font-inter text-sm text-dl-warm-white focus:border-dl-orange focus:outline-none"
      />
    </label>
  );
}
