<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    // Class imports
    import { MetaDescription } from "$lib/classes/MetaDescription";

    export let series: string, nextRace: RaceData, sessions: { [key: string]: string };

    const metaDescription = new MetaDescription(series, nextRace, sessions);
</script>

<svelte:head>
    <meta name="description" content="{metaDescription.metaString}">
</svelte:head>