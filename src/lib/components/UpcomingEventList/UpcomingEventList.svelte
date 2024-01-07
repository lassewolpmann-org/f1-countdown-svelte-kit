<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";
    import type { CarLaunch } from "$lib/types/CarLaunch";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";
    import CarLaunchList from "$lib/components/UpcomingEventList/CarLaunch/CarLaunchList.svelte";

    export let nextEvents: RaceData[], carLaunches: CarLaunch[], preSeasonTesting: RaceData;

    function showData(): boolean {
        const nextEvent = nextEvents.at(0)
        if (!nextEvent) return false

        const firstSession = Object.values(nextEvent.sessions).at(0);
        if (!firstSession) return false

        const currentTimestamp = new Date().getTime();

        // For debug purposes
        // const currentTimestamp = new Date('2024-05-31').getTime();

        const sessionTimestamp = new Date(firstSession).getTime();

        return currentTimestamp < sessionTimestamp
    }
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
    {#if nextEvents.length > 0}
        {#if carLaunches.length > 0 && showData()}
            <CarLaunchList {carLaunches} />
        {/if}

        {#if preSeasonTesting && showData()}
            <h3>Pre-Season Testing</h3>
            <UpcomingEvent event={preSeasonTesting} />
        {/if}

        <h3>Upcoming Grands Prix</h3>
        {#each nextEvents as event}
            <UpcomingEvent {event} />
        {/each}
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>