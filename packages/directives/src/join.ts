import { z } from "zod";
import { defineDirective, resolvePropValue } from "@json-render/core";

export const joinDirective = defineDirective({
  name: "$join",
  description: "Join array elements with a separator.",
  schema: z.object({
    $join: z.unknown(),
    separator: z.string().optional(),
  }),
  resolve(raw, ctx) {
    const resolved = resolvePropValue(raw.$join, ctx);
    const separator = raw.separator ?? ", ";

    if (Array.isArray(resolved)) {
      return resolved
        .map((item) => (item != null ? String(item) : ""))
        .join(separator);
    }
    return resolved != null ? String(resolved) : "";
  },
});
