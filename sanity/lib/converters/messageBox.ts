function randomKey() {
  return Math.random().toString(36).substring(2, 14)
}

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
        _key: randomKey(),

        style: "normal",
        markDefs: [],

        children: [
          {
            _type: "span",
            _key: randomKey(),

            text: data.text || "",
            marks: [],
          },
        ],
      },
    ],
  }
}
