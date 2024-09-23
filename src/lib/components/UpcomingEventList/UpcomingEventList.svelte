<script lang="ts">
    // Type imports
    import type { DataConfig, RaceData } from "$lib/types/RaceData";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";

    export let nextEvents: RaceData[], flags: {[key: string]: string}, dataConfig: DataConfig;
</script>

<style lang="scss">
    .upcoming-event-list {
        display: flex;
        flex-direction: column;

        gap: 30px;

        width: min(90vw, 1200px);

        margin: 25px 0;
    }
</style>

<div class="upcoming-event-list">
    {#if nextEvents.length > 0}
        <h3>Upcoming Grands Prix</h3>
        {#each nextEvents as event}
            <UpcomingEvent {event} {flags} {dataConfig} />
        {/each}
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>