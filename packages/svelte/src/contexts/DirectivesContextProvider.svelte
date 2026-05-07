<script module lang="ts">
  import { getContext } from "svelte";
  import type { DirectiveDefinition, DirectiveRegistry } from "@json-render/core";
  import { createDirectiveRegistry } from "@json-render/core";

  const DIRECTIVES_KEY = Symbol.for("json-render-directives");

  /**
   * Directives context value
   */
  export interface DirectivesContext {
    /** Custom directive registry */
    registry: DirectiveRegistry | undefined;
  }

  /**
   * Get the directives registry from component tree
   */
  export function getDirectives(): DirectiveRegistry | undefined {
    const ctx = getContext<DirectivesContext>(DIRECTIVES_KEY);
    return ctx?.registry;
  }
</script>

<script lang="ts">
  import { setContext, type Snippet } from "svelte";

  interface Props {
    directives?: DirectiveDefinition[];
    children?: Snippet;
  }

  let { directives, children }: Props = $props();

  let registry = $derived(
    directives ? createDirectiveRegistry(directives) : undefined,
  );

  setContext(DIRECTIVES_KEY, {
    get registry() {
      return registry;
    },
  } satisfies DirectivesContext);
</script>

{@render children?.()}
