<script lang="ts">
    // Type imports
    import type { DataConfig, RaceData } from "$lib/types/RaceData";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";

    export let nextEvents: RaceData[], flags: {[key: string]: string}, dataConfig: DataConfig;
</script>

<div class="flex flex-col w-full max-w-6xl gap-4">
    {#if nextEvents.length > 0}
        <span class="text-xl lg:text-2xl xl:text-5xl font-medium">Upcoming Grands Prix</span>
        <div class="flex flex-col gap-6">
            {#each nextEvents as event}
                <UpcomingEvent {event} {flags} {dataConfig} />
            {/each}
        </div>
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>