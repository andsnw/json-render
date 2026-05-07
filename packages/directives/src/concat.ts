import { z } from "zod";
import { defineDirective, resolvePropValue } from "@json-render/core";

export const concatDirective = defineDirective({
  name: "$concat",
  description: "Concatenate multiple dynamic values into a string.",
  schema: z.object({
    $concat: z.array(z.unknown()),
  }),
  resolve(raw, ctx) {
    return raw.$concat
      .map((part) => {
        const resolved = resolvePropValue(part, ctx);
        return resolved != null ? String(resolved) : "";
      })
      .join("");
  },
});
