import { defineField, defineType } from "sanity"

export const amazonProduct = defineType({
  name: "amazonProduct",
  title: "Amazon Product",
  type: "object",

  fields: [
    defineField({
      name: "inputType",
      title: "Product Input",
      type: "string",
      options: {
        list: [
          {
            title: "ASIN",
            value: "asin",
          },
          {
            title: "Amazon Affiliate Link",
            value: "affiliateLink",
          },
        ],
        layout: "radio",
      },
      initialValue: "asin",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "asin",
      title: "Amazon ASIN",
      type: "string",
      description:
        "Enter the 10-character Amazon ASIN, for example: B0XXXXXXXX",
      hidden: ({ parent }) => parent?.inputType !== "asin",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent?.inputType !== "asin") {
            return true
          }

          if (!value) {
            return "ASIN is required."
          }

          if (!/^[A-Z0-9]{10}$/i.test(value)) {
            return "ASIN must be exactly 10 letters/numbers."
          }

          return true
        }),
    }),

    defineField({
      name: "affiliateLink",
      title: "Amazon Affiliate Link",
      type: "url",
      description:
        "Paste your Amazon affiliate link. The ASIN will be extracted automatically.",
      hidden: ({ parent }) =>
        parent?.inputType !== "affiliateLink",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent?.inputType !== "affiliateLink") {
            return true
          }

          if (!value) {
            return "Amazon affiliate link is required."
          }

          return true
        }),
    }),

    defineField({
      name: "recommendation",
      title: "Why We Recommend It",
      type: "text",
      rows: 4,
      description:
        "Add your own editorial recommendation. Explain why this product fits the article.",
    }),

    defineField({
      name: "label",
      title: "Recommendation Label",
      type: "string",
      description:
        'Optional label such as "Velvet Nest Pick" or "Best for Everyday Wear".',
      initialValue: "Velvet Nest Pick",
    }),
  ],

  preview: {
    select: {
      inputType: "inputType",
      asin: "asin",
      affiliateLink: "affiliateLink",
      recommendation: "recommendation",
    },

    prepare({
      inputType,
      asin,
      affiliateLink,
      recommendation,
    }) {
      return {
        title: "🛍️ Amazon Product",
        subtitle:
          inputType === "asin"
            ? asin || "ASIN not entered"
            : affiliateLink || "Affiliate link not entered",
        description:
          recommendation || "No recommendation added",
      }
    },
  },
})
