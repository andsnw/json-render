import Link from "next/link";
import { Code } from "@/components/code";

export const metadata = {
  title: "Catalog | json-render",
};

export default function CatalogPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-4">Catalog</h1>
      <p className="text-muted-foreground mb-8">
        The catalog defines what AI can generate. It&apos;s your guardrail.
      </p>

      <h2 className="text-xl font-semibold mt-12 mb-4">What is a Catalog?</h2>
      <p className="text-sm text-muted-foreground mb-4">
        A catalog is a schema that defines:
      </p>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
        <li>
          <strong className="text-foreground">Components</strong> — UI elements
          AI can create (with props and optional slots)
        </li>
        <li>
          <strong className="text-foreground">Actions</strong> — Operations AI
          can trigger
        </li>
        <li>
          <strong className="text-foreground">Functions</strong> — Custom
          validation or transformation functions
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-12 mb-4">Creating a Catalog</h2>
      <Code lang="typescript">{`import { defineCatalog } from '@json-render/core';
import { schema } from '@json-render/react';
import { z } from 'zod';

const catalog = defineCatalog(schema, {
  components: {
    // Define each component with its props schema
    Card: {
      props: z.object({
        title: z.string(),
        description: z.string().nullable(),
        padding: z.enum(['sm', 'md', 'lg']).nullable(),
      }),
      slots: ["default"], // Can contain other components
      description: "Container card for grouping content",
    },
    
    Metric: {
      props: z.object({
        label: z.string(),
        valuePath: z.string(), // JSON Pointer to data
        format: z.enum(['currency', 'percent', 'number']),
      }),
      description: "Display a single metric value",
    },
  },
  
  actions: {
    submit_form: {
      params: z.object({
        formId: z.string(),
      }),
      description: 'Submit a form',
    },
    
    export_data: {
      params: z.object({
        format: z.enum(['csv', 'pdf', 'json']),
      }),
      description: 'Export data in various formats',
    },
  },
});`}</Code>

      <h2 className="text-xl font-semibold mt-12 mb-4">Component Definition</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Each component in the catalog has:
      </p>
      <Code lang="typescript">{`{
  props: z.object({...}),  // Zod schema for props (use .nullable() for optional)
  slots?: string[],        // Named slots for children (e.g., ["default"])
  description?: string,    // Help AI understand when to use it
}`}</Code>
      <p className="text-sm text-muted-foreground mt-4 mb-4">
        Use{" "}
        <code className="text-foreground">slots: [&quot;default&quot;]</code>{" "}
        for components that can contain children. The slot name corresponds to
        where child elements are rendered.
      </p>

      <h2 className="text-xl font-semibold mt-12 mb-4">
        Generating AI Prompts
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Use the <code className="text-foreground">catalog.prompt()</code> method
        to generate a system prompt for AI:
      </p>
      <Code lang="typescript">{`// Generate a system prompt from your catalog
const systemPrompt = catalog.prompt();

// Or with custom rules for the AI
const customPrompt = catalog.prompt({
  customRules: [
    "Always use Card as the root element for forms",
    "Group related inputs in a Stack with direction=vertical",
  ],
});

// Pass this to your AI model as the system prompt`}</Code>

      <h2 className="text-xl font-semibold mt-12 mb-4">Next</h2>
      <p className="text-sm text-muted-foreground">
        Learn how to{" "}
        <Link href="/docs/registry" className="text-foreground hover:underline">
          register components
        </Link>{" "}
        in your registry.
      </p>
    </article>
  );
}
