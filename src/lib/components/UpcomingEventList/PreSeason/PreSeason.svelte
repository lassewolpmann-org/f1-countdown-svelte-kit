<script lang="ts">
    import type { RaceData, DataConfig } from "$lib/types/RaceData";
    import UpcomingEvent from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent.svelte";
    import { isSessionInPast } from "$lib/functions/isSessionInPast";

    export let preSeasonTesting: RaceData, preSeasonTestingConfig: DataConfig, flags: {[key: string]: string};

    let lastSessionDate = Object.values(preSeasonTesting.sessions).at(-1);
    let lastSessionName = Object.keys(preSeasonTesting.sessions).at(-1);
</script>
{#if !isSessionInPast(lastSessionDate, lastSessionName, preSeasonTestingConfig)}
    <h3>Pre-Season Testing</h3>
    <UpcomingEvent event={preSeasonTesting} {flags} dataConfig={preSeasonTestingConfig} />
{/if}
