<script module lang="ts">
  import type { ComputedFunction, DirectiveDefinition, Spec, StateStore } from "@json-render/core";
  import type { ComponentRenderer, ComponentRegistry } from "./renderer.js";

  export interface CatalogRendererProps {
    spec: Spec | null;
    registry: ComponentRegistry;
    store?: StateStore;
    state?: Record<string, unknown>;
    onAction?: (actionName: string, params?: Record<string, unknown>) => void;
    onStateChange?: (changes: Array<{ path: string; value: unknown }>) => void;
    functions?: Record<string, ComputedFunction>;
    /** Custom directives for user-defined `$`-prefixed dynamic values */
    directives?: DirectiveDefinition[];
    loading?: boolean;
    fallback?: ComponentRenderer;
  }
</script>

<script lang="ts">
  import type { ActionHandler } from "@json-render/core";
  import JsonUIProvider from "./JsonUIProvider.svelte";
  import Renderer from "./Renderer.svelte";

  let {
    spec,
    registry,
    store,
    state,
    onAction,
    onStateChange,
    functions,
    directives,
    loading = false,
    fallback,
  }: CatalogRendererProps = $props();

  let actionHandlers = $derived.by(() => {
    if (!onAction) return undefined;
    // Wrap onAction with a Proxy so any action name routes to the callback
    return new Proxy({} as Record<string, ActionHandler>, {
      get: (_target, prop: string) => {
        return (params: Record<string, unknown>) => onAction(prop, params);
      },
      has: () => true,
    });
  });
</script>

<JsonUIProvider
  {registry}
  {store}
  initialState={state}
  handlers={actionHandlers}
  {functions}
  {directives}
  {onStateChange}>
  <Renderer {spec} {registry} {loading} {fallback} />
</JsonUIProvider>
