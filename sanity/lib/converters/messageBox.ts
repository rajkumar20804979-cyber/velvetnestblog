import { randomKey } from "@sanity/block-tools"

export function convertMessageBox(data: {
  title?: string
  type?: string
  text?: string
}) {
  return {
    _type: "messageBox",

    boxType: data.type || "info",

    title: data.title || "",

    content: [
      {
        _type: "block",
        _key: randomKey(12),

        style: "normal",
        markDefs: [],

        children: [
          {
            _type: "span",
            _key: randomKey(12),

            text: data.text || "",
            marks: [],
          },
        ],
      },
    ],
  }
}
