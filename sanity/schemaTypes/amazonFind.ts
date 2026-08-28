import { defineField, defineType } from "sanity"

export default defineType({
  name: "amazonFind",
  title: "Amazon Find",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
  name: "asin",
  title: "Amazon ASIN",
  type: "string",
  description:
    "Enter the Amazon product ASIN. Example: B0XXXXXXXX",
  validation: (Rule) =>
    Rule.min(10)
      .max(10)
      .error("ASIN must be exactly 10 characters."),
}),

    defineField({
      name: "recommendation",
      title: "Why We Recommend It",
      type: "text",
      rows: 4,
      description:
        "Your editorial recommendation or reason for choosing this product.",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),

    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "string",
    }),

    defineField({
      name: "affiliateLink",
      title: "Affiliate Link",
      type: "url",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
  ],
})
