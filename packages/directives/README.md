# @json-render/directives

Pre-built custom directives for `@json-render/core`. Drop them into your catalog and renderer to add formatting, math, string manipulation, and i18n to your AI-generated UIs.

## Install

```bash
npm install @json-render/directives
```

## Quick Start

```typescript
import { standardDirectives } from '@json-render/directives';

// Wire into prompt generation
const prompt = catalog.prompt({ directives: standardDirectives });

// Wire into the renderer
<JSONUIProvider spec={spec} directives={directives}>
  ...
</JSONUIProvider>
```

## Available Directives

### `$format` — Locale-aware value formatting

```json
{ "$format": "currency", "value": { "$state": "/cart/total" }, "currency": "USD" }
{ "$format": "date", "value": { "$state": "/user/createdAt" } }
{ "$format": "number", "value": 1234567, "notation": "compact" }
{ "$format": "percent", "value": 0.75 }
```

Formats: `date`, `currency`, `number`, `percent`. The `value` field accepts any dynamic expression.

### `$math` — Arithmetic operations

```json
{ "$math": "add", "a": { "$state": "/subtotal" }, "b": { "$state": "/tax" } }
{ "$math": "multiply", "a": { "$state": "/price" }, "b": { "$state": "/qty" } }
{ "$math": "round", "a": 3.7 }
```

Operations: `add`, `subtract`, `multiply`, `divide`, `mod`, `min`, `max`, `round`, `floor`, `ceil`, `abs`. Unary ops only use `a`.

### `$concat` — String concatenation

```json
{ "$concat": [{ "$state": "/user/firstName" }, " ", { "$state": "/user/lastName" }] }
```

Each element is resolved then joined into a single string.

### `$count` — Array/string length

```json
{ "$count": { "$state": "/cart/items" } }
```

Returns the length of an array or string. Returns `0` for other types.

### `$truncate` — Text truncation

```json
{ "$truncate": { "$state": "/post/body" }, "length": 140, "suffix": "..." }
```

Default length is 100, default suffix is `"..."`.

### `$pluralize` — Singular/plural forms

```json
{ "$pluralize": { "$state": "/cart/itemCount" }, "one": "item", "other": "items", "zero": "no items" }
```

Outputs: `"3 items"`, `"1 item"`, or `"no items"`. The `zero` form is optional.

### `$join` — Join array elements

```json
{ "$join": { "$state": "/tags" }, "separator": ", " }
```

Default separator is `", "`.

### `createI18nDirective` — Internationalization

```typescript
import { createI18nDirective } from '@json-render/directives';

const t = createI18nDirective({
  locale: 'en',
  messages: {
    en: { "greeting": "Hello, {{name}}!", "checkout.submit": "Place Order" },
    es: { "greeting": "Hola, {{name}}!", "checkout.submit": "Realizar Pedido" },
  },
  fallbackLocale: 'en',
});
```

```json
{ "$t": "checkout.submit" }
{ "$t": "greeting", "params": { "name": { "$state": "/user/name" } } }
```

This is a factory function because it requires locale configuration at setup time.

## Composition

Directives compose naturally — each resolver calls `resolvePropValue` on its inputs:

```json
{
  "$format": "currency",
  "value": { "$math": "multiply", "a": { "$state": "/price" }, "b": { "$state": "/qty" } },
  "currency": "USD"
}
```

This resolves inside-out: `$math` first, then `$format` on the result.

## License

Apache-2.0
