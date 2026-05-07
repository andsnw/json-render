export { formatDirective } from "./format";
export { mathDirective } from "./math";
export { concatDirective } from "./concat";
export { countDirective } from "./count";
export { truncateDirective } from "./truncate";
export { pluralizeDirective } from "./pluralize";
export { joinDirective } from "./join";
export { createI18nDirective, type I18nConfig } from "./i18n";

import { formatDirective } from "./format";
import { mathDirective } from "./math";
import { concatDirective } from "./concat";
import { countDirective } from "./count";
import { truncateDirective } from "./truncate";
import { pluralizeDirective } from "./pluralize";
import { joinDirective } from "./join";

/**
 * All non-factory directives in a single array.
 * Spread with factory directives as needed:
 * `[...standardDirectives, createI18nDirective(config)]`
 */
export const standardDirectives = [
  formatDirective,
  mathDirective,
  concatDirective,
  countDirective,
  truncateDirective,
  pluralizeDirective,
  joinDirective,
];
