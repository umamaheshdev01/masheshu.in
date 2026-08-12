import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "masheshu.in",

  // Studio is served by Next at /studio — same domain, no separate deploy.
  basePath: "/studio",

  projectId,
  dataset,

  schema: { types: schemaTypes },

  plugins: [
    structureTool({
      // Group the three types in a fixed order rather than alphabetically.
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("post").title("Posts"),
            S.documentTypeListItem("photo").title("Photos"),
          ]),
    }),
    codeInput(),
    // Vision runs GROQ queries against the dataset. Handy for debugging.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
