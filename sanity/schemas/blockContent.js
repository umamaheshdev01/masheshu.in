import { defineType, defineArrayMember } from "sanity";

/**
 * The body of a post or project. This is Portable Text — you write in
 * Studio's editor and pick a style from a dropdown. There is no syntax to
 * remember and nothing to escape; the site decides how each style looks.
 */
export default defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // Deliberately short. Headings are H2/H3 because the page title is
      // already the H1 — more levels than this is a formatting decision you
      // said you don't want to make.
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              },
            ],
          },
        ],
      },
    }),

    // Drop an image anywhere between paragraphs.
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe the image for screen readers and search engines.",
        },
        { name: "caption", type: "string", title: "Caption" },
        {
          name: "size",
          type: "string",
          title: "Size",
          options: {
            list: [
              { title: "Default", value: "default" },
              { title: "Wide", value: "wide" },
              { title: "Inset", value: "inset" },
            ],
            layout: "radio",
          },
          initialValue: "default",
        },
      ],
    }),

    // A row of images, same as the old <Gallery> component.
    defineArrayMember({
      type: "object",
      name: "gallery",
      title: "Gallery",
      fields: [
        {
          name: "images",
          type: "array",
          title: "Images",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            },
          ],
          validation: (rule) => rule.min(2),
        },
        { name: "caption", type: "string", title: "Caption" },
      ],
      preview: {
        select: { images: "images", caption: "caption" },
        prepare: ({ images = [], caption }) => ({
          title: caption || "Gallery",
          subtitle: `${images.length} image${images.length === 1 ? "" : "s"}`,
          media: images[0],
        }),
      },
    }),

    defineArrayMember({
      type: "code",
      title: "Code block",
      options: { withFilename: true },
    }),
  ],
});
