import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { z } from "zod";
import type { Spec } from "@json-render/core";
import { defineDirective, resolvePropValue } from "@json-render/core";
import {
  JSONUIProvider,
  Renderer,
  type ComponentRenderProps,
} from "./renderer";

function Text({ element }: ComponentRenderProps<{ text: unknown }>) {
  const value = element.props.text;
  return <span data-testid="text">{value == null ? "" : String(value)}</span>;
}

const registry = { Text };

const doubleDirective = defineDirective({
  name: "$double",
  description: "Double a numeric value.",
  schema: z.object({ $double: z.unknown() }),
  resolve(value, ctx) {
    const resolved = resolvePropValue(value.$double, ctx);
    return (resolved as number) * 2;
  },
});

const upperDirective = defineDirective({
  name: "$upper",
  schema: z.object({ $upper: z.unknown() }),
  resolve(value, ctx) {
    const resolved = resolvePropValue(value.$upper, ctx);
    return String(resolved).toUpperCase();
  },
});

describe("directives in React renderer", () => {
  it("resolves a custom directive in rendered props", () => {
    const spec: Spec = {
      root: "main",
      elements: {
        main: {
          type: "Text",
          props: { text: { $upper: "hello" } },
          children: [],
        },
      },
    };

    render(
      <JSONUIProvider
        registry={registry}
        directives={[doubleDirective, upperDirective]}
      >
        <Renderer spec={spec} registry={registry} />
      </JSONUIProvider>,
    );

    expect(screen.getByTestId("text").textContent).toBe("HELLO");
  });

  it("resolves a directive that reads from state", () => {
    const spec: Spec = {
      root: "main",
      elements: {
        main: {
          type: "Text",
          props: { text: { $double: { $state: "/count" } } },
          children: [],
        },
      },
      state: { count: 7 },
    };

    render(
      <JSONUIProvider
        registry={registry}
        initialState={{ count: 7 }}
        directives={[doubleDirective, upperDirective]}
      >
        <Renderer spec={spec} registry={registry} />
      </JSONUIProvider>,
    );

    expect(screen.getByTestId("text").textContent).toBe("14");
  });

  it("renders without directives (backward compat)", () => {
    const spec: Spec = {
      root: "main",
      elements: {
        main: {
          type: "Text",
          props: { text: "plain" },
          children: [],
        },
      },
    };

    render(
      <JSONUIProvider registry={registry}>
        <Renderer spec={spec} registry={registry} />
      </JSONUIProvider>,
    );

    expect(screen.getByTestId("text").textContent).toBe("plain");
  });
});
