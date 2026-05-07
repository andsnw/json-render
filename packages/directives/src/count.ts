import { z } from "zod";
import { defineDirective, resolvePropValue } from "@json-render/core";

export const countDirective = defineDirective({
  name: "$count",
  description: "Get the length of an array or string.",
  schema: z.object({
    $count: z.unknown(),
  }),
  resolve(raw, ctx) {
    const resolved = resolvePropValue(raw.$count, ctx);
    if (Array.isArray(resolved)) return resolved.length;
    if (typeof resolved === "string") return resolved.length;
    return 0;
  },
});
