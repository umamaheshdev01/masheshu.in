import { defineType, defineField } from "sanity";

import { isUniqueAcrossTypes } from "../lib/isUniqueSlug";

/**
 * A project. Listed on /projects, and each one opens its own write-up at
 * /post/<slug> — the same detail page the posts use.
 */
export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "card", title: "Grid card" },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The URL: /post/<slug>. Click Generate.",
      group: "content",
      options: { source: "title", maxLength: 96, isUnique: isUniqueAcrossTypes },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "copy",
      title: "One-liner",
      type: "string",
      description: "The short line under the title in the projects list.",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule.required().regex(/^\d{4}$/, { name: "four digit year" }),
    }),
    defineField({
      name: "date",
      title: "Sort date",
      type: "date",
      description: "Orders the list and dates the detail page.",
      group: "content",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updated",
      title: "Last updated",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Write-up",
      type: "blockContent",
      description: "The detail page. Headings, paragraphs and images.",
      group: "content",
    }),

    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      group: "card",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "height",
      title: "Card height",
      type: "number",
      group: "card",
      options: {
        list: [
          { title: "Short", value: 200 },
          { title: "Medium", value: 250 },
          { title: "Tall", value: 300 },
        ],
        layout: "radio",
      },
      initialValue: 250,
    }),

    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "seo",
    }),
    defineField({
      name: "externalUrl",
      title: "Live URL",
      type: "url",
      description: "Link to the shipped thing, if there is one.",
      group: "seo",
    }),
  ],

  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],

  preview: {
    select: { title: "title", subtitle: "copy", media: "cover" },
  },
});
