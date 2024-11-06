<script lang="ts">
    // Type imports
    import type { DataConfig, RaceData } from "$lib/types/RaceData";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";

    export let nextEvents: RaceData[], flags: {[key: string]: string}, dataConfig: DataConfig;
</script>

<div class="flex flex-col gap-8 w-full">
    {#if nextEvents.length > 0}
        <h3 class="font-semibold text-xl lg:text-2xl">Upcoming Grands Prix</h3>
        {#each nextEvents as event}
            <UpcomingEvent {event} {flags} {dataConfig} />
        {/each}
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>