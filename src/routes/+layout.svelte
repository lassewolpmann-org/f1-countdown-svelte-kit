<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Border from "$lib/components/Border.svelte";
    import MetaDescription from "$lib/components/MetaDescription.svelte";

    import type { LayoutData } from './$types';

    export let data: LayoutData;

    const { apiData } = data;
</script>

<MetaDescription series={apiData.series} nextRace={apiData.nextRace} sessions={apiData.nextRace.sessions} />
<svelte:head>
    <title>{apiData.series.toUpperCase()} Countdown</title>
    <meta name="apple-itunes-app" content="app-id=6472580786">
</svelte:head>
<slot></slot>
<Border />
<Footer seriesName={apiData.series} />