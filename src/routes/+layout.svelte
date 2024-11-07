<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Border from "$lib/components/Border.svelte";

    import "../app.css";
    import type { LayoutData } from './$types';
    import type {RaceData} from "$lib/types/RaceData";
    import { seriesName} from "$lib/functions/parseSeriesName";
    import { longSessionName, shortSessionName } from "$lib/functions/parseSessionName";

    export let data: LayoutData;

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

    const { apiData } = data;

    let metaDescription: MetaDescription;
    let series = "f1";
    let seriesData = apiData.seriesData[series];

    if (seriesData) {
        metaDescription = new MetaDescription(series, seriesData.nextRace);
    }
</script>

<svelte:head>
    <title>Formula Countdown</title>
    <meta name="apple-itunes-app" content="app-id=6472580786">
    <meta name="description" content="{metaDescription.metaString}">
</svelte:head>
{#if apiData}
    <div class="flex flex-col items-center justify-center px-4 py-6 xl:px-6 xl:py-9 gap-4">
        <slot></slot>
        <Border />
        <Footer />
    </div>
{/if}