export const metadata = {
  title: "Introduction | json-render",
};

export default function DocsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-4">Introduction</h1>
      <p className="text-muted-foreground mb-8">
        Predictable. Guardrailed. Fast. Let users generate dashboards, widgets, apps, and data visualizations from prompts.
      </p>

      <h2 className="text-xl font-semibold mt-12 mb-4">What is json-render?</h2>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        json-render lets end users generate UI from natural language prompts — safely constrained to 
        components you define. You set the guardrails: what components exist, what props they take, 
        what actions are available. AI generates JSON that matches your schema, and your components 
        render it natively.
      </p>

      <h2 className="text-xl font-semibold mt-12 mb-4">Why json-render?</h2>
      <div className="space-y-4 mb-8">
        <div>
          <h3 className="font-medium mb-1">Guardrailed</h3>
          <p className="text-sm text-muted-foreground">
            AI can only use components in your catalog. No arbitrary code generation.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Predictable</h3>
          <p className="text-sm text-muted-foreground">
            JSON output matches your schema, every time. Actions are declared by name, you control what they do.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Fast</h3>
          <p className="text-sm text-muted-foreground">
            Stream and render progressively as the model responds. No waiting for completion.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-12 mb-4">How it works</h2>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        <li>Define the guardrails — what components, actions, and data bindings AI can use</li>
        <li>Users prompt — end users describe what they want in natural language</li>
        <li>AI generates JSON — output is always predictable, constrained to your catalog</li>
        <li>Render fast — stream and render progressively as the model responds</li>
      </ol>
    </article>
  );
}
