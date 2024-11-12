<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";

    interface Props {
        nextEvents: RaceData[];
    }

    let { nextEvents }: Props = $props();
</script>

<div class="flex flex-col w-full max-w-6xl gap-4 xl:sticky xl:top-0">
    {#if nextEvents.length > 0}
        <span class="text-xl lg:text-2xl xl:text-5xl font-medium">Upcoming Races</span>
        <div class="flex flex-col gap-6">
            {#each nextEvents as event}
                <UpcomingEvent {event} />
            {/each}
        </div>
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>