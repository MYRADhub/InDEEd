export const initialVFS = {
  type: "folder",
  name: "root",
  children: [
    {
      type: "file",
      name: "Main.java",
      content: "// Entry point",
      readOnly: false,
    },
    {
      type: "folder",
      name: "utils",
      children: [
        {
          type: "file",
          name: "Helper.java",
          content: "// Utility class",
          readOnly: false,
        },
      ],
    },
  ],
};