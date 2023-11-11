<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    export let nextRace: RaceData, series: string;
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

<h1 class="event-name">{series.toUpperCase()} {nextRace.name} Grand Prix</h1>