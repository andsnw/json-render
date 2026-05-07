import { z } from "zod";
import { defineDirective, resolvePropValue } from "@json-render/core";
import type { DirectiveDefinition } from "@json-render/core";

export interface I18nConfig {
  /** Current locale (e.g. "en", "es") */
  locale: string;
  /** Map of locale → key → translated string */
  messages: Record<string, Record<string, string>>;
  /** Fallback locale when a key is missing in the current locale */
  fallbackLocale?: string;
}

/**
 * Create a `$t` directive for internationalization.
 *
 * @example
 * ```ts
 * const t = createI18nDirective({
 *   locale: 'en',
 *   messages: {
 *     en: { "greeting": "Hello, {{name}}!" },
 *     es: { "greeting": "Hola, {{name}}!" },
 *   },
 * });
 * ```
 */
export function createI18nDirective(config: I18nConfig): DirectiveDefinition {
  return defineDirective({
    name: "$t",
    description: "Translated text with {{param}} interpolation.",
    schema: z.object({
      $t: z.string(),
      params: z.record(z.string(), z.unknown()).optional(),
    }),
    resolve(raw, ctx) {
      const key = raw.$t;

      const localeMessages = config.messages[config.locale];
      const fallbackMessages = config.fallbackLocale
        ? config.messages[config.fallbackLocale]
        : undefined;
      let template = localeMessages?.[key] ?? fallbackMessages?.[key] ?? key;

      if (raw.params) {
        for (const [paramKey, paramValue] of Object.entries(raw.params)) {
          const resolved = resolvePropValue(paramValue, ctx);
          template = template.replace(
            new RegExp(`\\{\\{${paramKey}\\}\\}`, "g"),
            resolved != null ? String(resolved) : "",
          );
        }
      }

      return template;
    },
  });
}
