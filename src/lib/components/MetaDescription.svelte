<script lang="ts">
    import type { APIData } from "$lib/classes/APIData";

    class MetaDescription {
        metaString: string;

        constructor(series: string, nextRace: RaceData) {
            if (Object.keys(nextRace).length === 0) {
                this.metaString = `When is the next ${seriesName(series)} race?`;

                return
            }

            const firstSessionDate = Object.values(nextRace.sessions).at(0);
            const eventYear = firstSessionDate ? new Date(firstSessionDate).getFullYear() : new Date().getFullYear();

            let metaString = `When is the next ${seriesName(series)} race? Countdown to the ${eventYear}`;

            const raceName = `${nextRace.name} Grand Prix. Full schedule for`;
            const sessionNames = Object.keys(nextRace.sessions).map((session) => {
                return `${longSessionName(session)} (${shortSessionName(session)})`
            });

            metaString = metaString.concat(` ${seriesName(series)} ${raceName} ${sessionNames.join(', ')}.`);

            this.metaString = metaString;
        }
    }

    // Type imports
    import type { RaceData } from "$lib/types/RaceData";
    import {longSessionName, shortSessionName} from "$lib/functions/parseSessionName";
    import {seriesName} from "$lib/functions/parseSeriesName";

    export let apiData: APIData;

    let series = "f1";
    let data = apiData.seriesData[series];
    let metaDescription: MetaDescription;

    if (data) {
        metaDescription = new MetaDescription(series, data.nextRace);
    }
</script>

<svelte:head>
    <meta name="description" content="{metaDescription.metaString}">
</svelte:head>