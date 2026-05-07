import { z } from "zod";
import { defineDirective, resolvePropValue } from "@json-render/core";

export const pluralizeDirective = defineDirective({
  name: "$pluralize",
  description:
    'Select singular/plural/zero form based on count. Output: "3 items", "1 item", or "no items".',
  schema: z.object({
    $pluralize: z.unknown(),
    zero: z.string().optional(),
    one: z.string(),
    other: z.string(),
  }),
  resolve(raw, ctx) {
    const resolved = resolvePropValue(raw.$pluralize, ctx);
    const n = Number(resolved);
    const count = Number.isNaN(n) ? 0 : n;

    if (count === 0 && raw.zero != null) return raw.zero;
    if (count === 1) return `${count} ${raw.one}`;
    return `${count} ${raw.other}`;
  },
});
