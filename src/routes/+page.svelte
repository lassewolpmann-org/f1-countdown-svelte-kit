<script lang="ts">
    // Component imports
    import Footer from "$lib/components/Footer.svelte";
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList/UpcomingEventList.svelte";
    import Border from "$lib/components/Border.svelte";
    import MetaDescription from "$lib/components/MetaDescription/MetaDescription.svelte";
    import RaceTitle from "$lib/components/RaceTitle.svelte";
    import SessionSelection from "$lib/components/SessionSelection/SessionSelection.svelte";

    // Type imports
    import type { PageData } from './$types';

    // Font imports
    import "@fontsource/poppins/100.css";
    import "@fontsource/poppins/200.css";
    import "@fontsource/poppins/300.css";
    import "@fontsource/poppins/400.css";
    import "@fontsource/poppins/500.css";
    import "@fontsource/poppins/600.css";
    import "@fontsource/poppins/700.css";
    import "@fontsource/poppins/800.css";

    export let data: PageData;

    const { apiData } = data;
</script>
<style>
    main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>

<MetaDescription series={apiData.series} nextRace={apiData.nextRace} sessions={apiData.nextRaceSessions} />
<svelte:head>
    <title>{apiData.series.toUpperCase()} Countdown</title>
</svelte:head>

<main>
    {#if Object.keys(apiData.nextRaceSessions).length > 0}
        <RaceTitle nextRace={apiData.nextRace} />
        <SessionSelection nextEventSessions={apiData.nextRaceSessions} />
        <Timer nextEventSessions={apiData.nextRaceSessions} />
        <Border />
        <UpcomingEventList nextEvents={apiData.nextRaces} />
    {:else}
        <h1>There doesn't seem to be any data available.</h1>
        <h2>Please come back at another time.</h2>
    {/if}
</main>
<Border />
<Footer seriesName={apiData.series} />