import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await db.project.findMany({ orderBy: { order: "asc" } });

  async function create(formData: FormData) {
    "use server";
    const slug = String(formData.get("slug") ?? "").trim();
    if (!slug) return;
    await db.project.create({
      data: {
        slug,
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        tags: String(formData.get("tags") ?? ""),
        image: String(formData.get("image") ?? ""),
        link: String(formData.get("link") ?? "") || null,
        featured: formData.get("featured") === "on",
        order: Number(formData.get("order") ?? 0) || 0,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/projects");
  }

  async function update(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    if (!id) return;
    await db.project.update({
      where: { id },
      data: {
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        tags: String(formData.get("tags") ?? ""),
        image: String(formData.get("image") ?? ""),
        link: String(formData.get("link") ?? "") || null,
        featured: formData.get("featured") === "on",
        order: Number(formData.get("order") ?? 0) || 0,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/projects");
  }

  async function remove(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    if (!id) return;
    await db.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/projects");
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-syne text-2xl font-bold text-dl-warm-white">
        Projects
      </h1>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-dl-peach">
          Add new
        </h2>
        <form
          action={create}
          className="flex flex-col gap-3 rounded-xl border border-dl-navy/30 bg-dl-slate p-4"
        >
          <Row>
            <Field name="slug" label="Slug (unique)" required />
            <Field name="order" label="Order" type="number" defaultValue="0" />
          </Row>
          <Field name="title" label="Title" required />
          <Textarea name="description" label="Description" required />
          <Field name="tags" label="Tags (comma-separated)" />
          <Row>
            <Field name="image" label="Image URL" required />
            <Field name="link" label="Live URL (optional)" />
          </Row>
          <label className="flex items-center gap-2 font-inter text-sm text-dl-muted">
            <input
              type="checkbox"
              name="featured"
              className="accent-dl-orange"
            />
            Featured (large bento card)
          </label>
          <button
            type="submit"
            className="self-start rounded-full bg-dl-orange px-5 py-2 font-inter font-semibold text-dl-deep transition-colors hover:bg-dl-peach"
          >
            Add project
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-dl-peach">
          Existing ({projects.length})
        </h2>
        {projects.length === 0 && (
          <p className="font-inter text-sm text-dl-muted">No projects yet.</p>
        )}
        {projects.map((p) => (
          <details
            key={p.id}
            className="overflow-hidden rounded-xl border border-dl-navy/30 bg-dl-slate"
          >
            <summary className="cursor-pointer list-none px-4 py-3 font-inter text-sm text-dl-warm-white">
              <span className="font-syne font-bold">{p.title}</span>
              <span className="ml-2 font-mono text-xs text-dl-muted">
                {p.slug}
              </span>
              {p.featured && (
                <span className="ml-2 rounded-full bg-dl-orange/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-dl-orange">
                  Featured
                </span>
              )}
            </summary>
            <form
              action={update}
              className="flex flex-col gap-3 border-t border-dl-navy/30 p-4"
            >
              <input type="hidden" name="id" value={p.id} />
              <Field name="title" label="Title" defaultValue={p.title} required />
              <Textarea
                name="description"
                label="Description"
                defaultValue={p.description}
                required
              />
              <Field name="tags" label="Tags" defaultValue={p.tags} />
              <Row>
                <Field name="image" label="Image URL" defaultValue={p.image} required />
                <Field name="link" label="Live URL" defaultValue={p.link ?? ""} />
              </Row>
              <Row>
                <Field
                  name="order"
                  label="Order"
                  type="number"
                  defaultValue={String(p.order)}
                />
                <label className="flex items-center gap-2 font-inter text-sm text-dl-muted">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={p.featured}
                    className="accent-dl-orange"
                  />
                  Featured
                </label>
              </Row>
              <button
                type="submit"
                className="self-start rounded-full bg-dl-orange px-4 py-2 font-inter text-sm font-semibold text-dl-deep transition-colors hover:bg-dl-peach"
              >
                Save
              </button>
            </form>
            <form
              action={remove}
              className="border-t border-dl-navy/30 px-4 py-3"
            >
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                className="font-inter text-xs text-red-400 transition-colors hover:text-red-300"
              >
                Delete this project
              </button>
            </form>
          </details>
        ))}
      </section>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Field({
  name,
  label,
  type = "text",
  defaultValue = "",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inter text-xs font-medium text-dl-muted">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="rounded-md border border-dl-navy/40 bg-dl-deep px-3 py-2 font-inter text-sm text-dl-warm-white focus:border-dl-orange focus:outline-none"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  defaultValue = "",
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inter text-xs font-medium text-dl-muted">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={3}
        className="resize-none rounded-md border border-dl-navy/40 bg-dl-deep px-3 py-2 font-inter text-sm text-dl-warm-white focus:border-dl-orange focus:outline-none"
      />
    </label>
  );
}
