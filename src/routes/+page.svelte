<script lang="ts">
    // Component imports
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList/UpcomingEventList.svelte";
    import Border from "$lib/components/Border.svelte";
    import RaceTitle from "$lib/components/RaceTitle.svelte";

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
<style lang="postcss">
    :global(html) {
        font-family: 'Poppins', system-ui;
        background: theme(colors.neutral.950);
        color: theme(colors.neutral.200);
    }

    :global(body) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
<main class="flex flex-col items-center justify-center gap-4 px-2 py-4 w-full max-w-4xl">
    {#if Object.keys(apiData.nextRace).length > 0}
        <RaceTitle nextRace={apiData.nextRace} flags={apiData.flags} />

        {#each Object.keys(apiData.nextRace.sessions) as sessionName}
            <Timer {sessionName} sessionDate={apiData.nextRace.sessions[sessionName]} />
        {/each}

        <Border />
        <UpcomingEventList
                nextEvents={apiData.nextRaces}
                flags={apiData.flags}
                dataConfig={apiData.dataConfig}
        />
    {:else}
        <div class="p-10">
            <h1>There doesn't seem to be any data available.</h1>
            <h2>Please come back at another time.</h2>
        </div>
    {/if}
</main>