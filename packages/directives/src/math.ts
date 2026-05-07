import { z } from "zod";
import { defineDirective, resolvePropValue } from "@json-render/core";

function toNum(v: unknown): number {
  if (v == null) return 0;
  const n = Number(v);
  if (Number.isNaN(n)) {
    console.warn(`$math: non-numeric value coerced to 0:`, v);
    return 0;
  }
  return n;
}

export const mathDirective = defineDirective({
  name: "$math",
  description:
    'Arithmetic operations. Unary ops (round, floor, ceil, abs) only use "a". Division by zero returns 0.',
  schema: z.object({
    $math: z.enum([
      "add",
      "subtract",
      "multiply",
      "divide",
      "mod",
      "min",
      "max",
      "round",
      "floor",
      "ceil",
      "abs",
    ]),
    a: z.unknown().optional(),
    b: z.unknown().optional(),
  }),
  resolve(raw, ctx) {
    const a = toNum(resolvePropValue(raw.a, ctx));
    const b = toNum(resolvePropValue(raw.b, ctx));

    switch (raw.$math) {
      case "add":
        return a + b;
      case "subtract":
        return a - b;
      case "multiply":
        return a * b;
      case "divide":
        return b !== 0 ? a / b : 0;
      case "mod":
        return b !== 0 ? a % b : 0;
      case "min":
        return Math.min(a, b);
      case "max":
        return Math.max(a, b);
      case "round":
        return Math.round(a);
      case "floor":
        return Math.floor(a);
      case "ceil":
        return Math.ceil(a);
      case "abs":
        return Math.abs(a);
      default:
        return a;
    }
  },
});
