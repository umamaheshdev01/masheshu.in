import { defineType, defineField } from "sanity";

/** A single photograph in the /photos grid. */
export default defineType({
  name: "photo",
  title: "Photo",
  type: "document",

  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the photo for screen readers.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Position",
      type: "number",
      description: "Lower numbers come first. Ties fall back to newest.",
      initialValue: 0,
    }),
  ],

  orderings: [
    { title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],

  preview: {
    select: { title: "alt", subtitle: "order", media: "image" },
  },
});
