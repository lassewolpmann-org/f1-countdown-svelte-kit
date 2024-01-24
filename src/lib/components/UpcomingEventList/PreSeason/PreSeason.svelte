<script lang="ts">
    import type { RaceData } from "$lib/types/RaceData";
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";
    import type {DataConfig} from "$lib/types/RaceData.js";

    export let preSeasonTesting: RaceData, preSeasonTestingConfig: DataConfig, flags: {[key: string]: string};

    const showPreseasonTesting = (): boolean => {
        const testingSessions = preSeasonTesting.sessions;
        if (!testingSessions) return false

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
{#if showPreseasonTesting()}
    <h3>Pre-Season Testing</h3>
    <UpcomingEvent event={preSeasonTesting} {flags} dataConfig={preSeasonTestingConfig} />
{/if}
