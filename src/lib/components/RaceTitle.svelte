<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    export let nextRace: RaceData;
</script>

<style>
    h1 {
        font-size: 48px;
        margin: 10px 0;
        text-align: center;
        font-weight: 600;
    }

    @media only screen and (max-width: 768px) {
        h1 {
            font-size: 32px;
        }
    }
</style>

<h1 class="event-name">{nextRace.name} Grand Prix</h1>