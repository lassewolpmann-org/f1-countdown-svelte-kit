<script lang="ts">
    // Function imports
    import { findCurrentSessionIndex } from "$lib/functions/findCurrentSessionIndex";
    import { calculateOffset } from "$lib/functions/calculateOffset";
    import { afterUpdate } from "svelte";

    // Store imports
    import { currentSessionIndex } from "$lib/stores/currentSessionIndex";

    export let nextEventSessions: { [key: string]: string };

    let sessionListEl: HTMLElement;

    const decreaseSessionIndex = () => {
        if ($currentSessionIndex > 0) {
            currentSessionIndex.update((index) => index - 1);
        }
    }

    const increaseSessionIndex = () => {
        if ($currentSessionIndex < Object.keys(nextEventSessions).length - 1) {
            currentSessionIndex.update((index) => index + 1);
        }
    }

    $: if (nextEventSessions) {
        const index = findCurrentSessionIndex(nextEventSessions);
        currentSessionIndex.set(index);
    }

    afterUpdate(() => {
        const offset = calculateOffset($currentSessionIndex, sessionListEl);
        sessionListEl.style.transform = `translateX(${offset}px)`;
    })
</script>

<style lang="postcss">
    .selected {
        color: var(--main-text-color);
        font-weight: bold;
    }

    /*
    .session-selection:after {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        content: "";
        background-image: linear-gradient(90deg, #111 15%, transparent 25%, transparent 75%, #111 85%);
    }



    .session {
        margin: 0 10px;
        color: var(--secondary-text-color);
    }

    @media only screen and (max-width: 768px) {
        .session-selection {
            font-size: 18px;
        }

        .all-sessions {
            width: 200px;
        }
    }

     */
</style>

<div class="selector flex flex-row items-center justify-center relative w-72 overflow-hidden" data-nosnippet>
    <button on:click={decreaseSessionIndex} aria-label="Decrease Session Index" class="bg-neutral-800 touch-manipulation z-10">←</button>
    <div class="transition" bind:this={sessionListEl}>
        {#each Object.keys(nextEventSessions) as sessionName, sessionIndex}
            <span class="session text-neutral-400 p-1" class:selected={sessionIndex === $currentSessionIndex}>{sessionName.toUpperCase()}</span>
        {/each}
    </div>
    <button on:click={increaseSessionIndex} aria-label="Increase Session Index" class="bg-neutral-800 touch-manipulation z-10">→</button>
</div>
