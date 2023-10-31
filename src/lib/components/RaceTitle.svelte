<script lang="ts">
    // Type imports
    import type { Event } from "$lib/types/Data";

    export let nextEvent: Event | undefined, seriesName: string;

    const nextEventName: string = nextEvent ? nextEvent.name : "Undefined";
</script>

<style>
    .event-name {
        font-size: 48px;
        margin: 10px 0;
        text-align: center;
        font-weight: 600;
    }

    @media only screen and (max-width: 768px) {
        .event-name {
            font-size: 32px;
        }
    }
</style>

<h1 class="event-name">{seriesName.toUpperCase()} {nextEventName} Grand Prix</h1>