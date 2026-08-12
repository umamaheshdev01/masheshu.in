import { defineType, defineField } from "sanity";

import { isUniqueAcrossTypes } from "../lib/isUniqueSlug";

/**
 * A post or article — the things you write. These fill the /work grid and
 * render at /post/<slug>.
 */
export default defineType({
  name: "post",
  title: "Post",
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
      name: "date",
      title: "Published",
      type: "date",
      group: "content",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updated",
      title: "Last updated",
      type: "date",
      description: "Optional. Only set this if you revise the post later.",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),

    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      description: "Shown on the grid card and at the top of the post.",
      group: "card",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "kind",
      title: "Card label",
      type: "string",
      description: 'Controls the button on the grid card.',
      group: "card",
      options: {
        list: [
          { title: "Read Post", value: "blog" },
          { title: "View Article", value: "article" },
        ],
        layout: "radio",
      },
      initialValue: "blog",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "height",
      title: "Card height",
      type: "number",
      description: "How tall the tile is in the grid.",
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
      description: "One or two sentences. Used in search results and the RSS feed.",
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
      title: "Original URL",
      type: "url",
      description: "If this was first published elsewhere, link it here.",
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
    select: { title: "title", date: "date", media: "cover" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toDateString() : "No date",
      media,
    }),
  },
});
