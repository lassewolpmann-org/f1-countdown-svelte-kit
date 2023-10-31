<script lang="ts">
    // Type imports
    import type { Event, SeriesData } from "$lib/types/Data";
    import { MetaDescription } from "$lib/components/MetaDescription/MetaDescription";

    export let seriesData: SeriesData, seriesName: string, nextEvent: Event | undefined;

    const metaDescription = new MetaDescription(seriesName, seriesData, nextEvent);
</script>

<svelte:head>
    <meta name="description" content="{metaDescription.descriptionString}">
</svelte:head>