<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";
    import type { CarLaunch } from "$lib/types/CarLaunch";

    // Component imports
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";
    import CarLaunchList from "$lib/components/UpcomingEventList/CarLaunch/CarLaunchList.svelte";

    export let nextEvents: RaceData[], carLaunches: CarLaunch[], preSeasonTesting: RaceData;

    const showPreseasonTesting = (): boolean => {
        const testingSessions = preSeasonTesting.sessions;
        const lastSessionDate = Object.values(testingSessions).at(-1);

        if (lastSessionDate) {
            const sessionTimestamp = new Date(lastSessionDate).getTime();
            const currentTimestamp = new Date().getTime();

            return currentTimestamp < sessionTimestamp
        } else {
            return false
        }
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
    {#if carLaunches.length > 0}
        <CarLaunchList {carLaunches} />
    {/if}

    {#if preSeasonTesting && showPreseasonTesting()}
        <h3>Pre-Season Testing</h3>
        <UpcomingEvent event={preSeasonTesting} />
    {/if}

    {#if nextEvents.length > 0}
        <h3>Upcoming Grands Prix</h3>
        {#each nextEvents as event}
            <UpcomingEvent {event} />
        {/each}
    {:else}
        <p>There are no more upcoming races this year</p>
    {/if}
</div>