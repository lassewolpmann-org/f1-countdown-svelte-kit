<script lang="ts">
    // Type imports
    import type { DataConfig, RaceData } from "$lib/types/RaceData";
    import type { CarLaunch } from "$lib/types/CarLaunch";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";
    import CarLaunchList from "$lib/components/UpcomingEventList/CarLaunch/CarLaunchList.svelte";
    import PreSeason from "$lib/components/UpcomingEventList/PreSeason/PreSeason.svelte";

    export let nextEvents: RaceData[], carLaunches: CarLaunch[], preSeasonTesting: RaceData, preSeasonTestingConfig: DataConfig, flags: {[key: string]: string}, dataConfig: DataConfig;
</script>

<style lang="scss">
    .upcoming-event-list {
        display: flex;
        flex-direction: column;

        gap: 20px;

        width: min(90vw, 550px);

        margin: 25px 0;
    }
</style>

<div class="upcoming-event-list">
    {#if carLaunches.length > 0}
        <CarLaunchList {carLaunches} />
    {/if}

    {#if preSeasonTesting}
        <PreSeason {preSeasonTesting} {preSeasonTestingConfig} {flags} />
    {/if}

    {#if nextEvents.length > 0}
        <h3>Upcoming Grands Prix</h3>
        {#each nextEvents as event}
            <UpcomingEvent {event} {flags} {dataConfig} />
        {/each}
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>