<script lang="ts">
    // Component imports
    import Timer from "$lib/components/Timer/Timer.svelte";
    import UpcomingEventList from "$lib/components/UpcomingEventList/UpcomingEventList.svelte";
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

    // Function imports
    import { seriesName } from "$lib/functions/parseSeriesName";

    export let data: PageData;

    const { apiData } = data;

    let currentSeries: string = "f1";

    $: currentData = apiData.seriesData[currentSeries]
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

{#if apiData}
    <main class="flex flex-col items-center justify-center gap-4 px-2 py-4 w-full">
        <select bind:value={currentSeries} class="bg-neutral-800 border-0 rounded-xl p-2.5">
            {#each apiData.seriesOptions as seriesOption}
                <option value="{seriesOption}">{seriesName(seriesOption)}</option>
            {/each}
        </select>

        {#if currentData && Object.keys(currentData.nextRace).length > 0}
            <div class="flex flex-col xl:flex-row xl:items-start items-center justify-center w-full gap-8">
                <div class="flex flex-col items-center justify-center gap-4">
                    <RaceTitle nextRace={currentData.nextRace} flags={apiData.flags} />

                    {#each Object.keys(currentData.nextRace.sessions) as sessionName}
                        <Timer {sessionName} sessionDate={currentData.nextRace.sessions[sessionName]} />
                    {/each}
                </div>

                <UpcomingEventList
                        nextEvents={currentData.nextRaces}
                        flags={apiData.flags}
                        dataConfig={currentData.dataConfig}
                />
            </div>
        {:else}
            <div class="p-10">
                <h1>There doesn't seem to be any data available.</h1>
                <h2>Please come back at another time.</h2>
            </div>
        {/if}
    </main>
{/if}
