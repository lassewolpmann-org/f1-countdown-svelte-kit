<script lang="ts">
    // Type imports
    import type { Event } from "$lib/types/Data";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";

    export let nextEvents: Event[];
</script>

<style lang="scss">
    .upcoming-event-list {
        display: flex;
        flex-direction: column;

        gap: 20px;

        width: min(90vw, 700px);

        margin: 25px 0;
    }
</style>

<div class="upcoming-event-list">
    {#each nextEvents as event}
        <UpcomingEvent {event} />
    {/each}
</div>