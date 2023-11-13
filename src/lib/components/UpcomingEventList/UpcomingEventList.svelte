<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";

    export let nextEvents: RaceData[];
</script>

<style lang="scss">
    .upcoming-event-list {
        display: flex;
        flex-direction: column;

        gap: 20px;

        width: min(90vw, 550px);

        margin: 25px 0;
    }
</style>

<div class="upcoming-event-list">
    {#if nextEvents.length > 0}
        {#each nextEvents as event}
            <UpcomingEvent {event} />
        {/each}
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>