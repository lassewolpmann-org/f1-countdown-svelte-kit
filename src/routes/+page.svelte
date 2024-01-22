<script lang="ts">
    // Component imports
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList/UpcomingEventList.svelte";
    import Border from "$lib/components/Border.svelte";
    import RaceTitle from "$lib/components/RaceTitle.svelte";
    import SessionSelection from "$lib/components/SessionSelection.svelte";

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
<main>
    {#if Object.keys(apiData.nextRaceSessions).length > 0}
        <RaceTitle nextRace={apiData.nextRace} />
        <SessionSelection nextEventSessions={apiData.nextRaceSessions} />
        <Timer nextEventSessions={apiData.nextRaceSessions} />
        <Border />
        <UpcomingEventList
                nextEvents={apiData.nextRaces}
                carLaunches={apiData.carLaunches}
                preSeasonTesting={apiData.preSeasonTesting}
                preSeasonTestingConfig={apiData.preSeasonTestingConfig}
                flags={apiData.flags}
                dataConfig={apiData.dataConfig}
        />
    {:else}
        <h1>There doesn't seem to be any data available.</h1>
        <h2>Please come back at another time.</h2>
    {/if}
</main>