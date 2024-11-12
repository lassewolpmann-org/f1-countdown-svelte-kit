<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";

    import "../app.css";
    import type { LayoutData } from './$types';
    import { seriesName } from "$lib/functions/parseSeriesName";
    import type { SeriesData } from "$lib/classes/APIData";

    interface Props {
        data: LayoutData;
        children?: import('svelte').Snippet;
    }

    let { data, children }: Props = $props();

    class MetaDescription {
        metaString: string

        constructor(series: string, seriesData: SeriesData | undefined) {
            this.metaString = `Countdown to the next ${seriesName(series)}. Full schedule for all Sessions on the Weekend.`

            if (!seriesData) return

            let nextRace = seriesData.nextRace

            if (Object.keys(nextRace).length === 0) return

            const firstSessionDate = Object.values(nextRace.sessions).at(0);
            const eventYear = firstSessionDate ? new Date(firstSessionDate).getFullYear() : new Date().getFullYear();

            let metaString = `When is the next ${seriesName(series)} race? Countdown to the ${eventYear}`;

            const raceName = `${nextRace.name} Grand Prix. Full schedule for`;
            const sessionNames = nextRace.prettySessions.map((session) => {
                return `${session.longName} (${session.shortName})`
            });

            metaString = metaString.concat(` ${seriesName(series)} ${raceName} ${sessionNames.join(', ')}.`);

            this.metaString = metaString;
        }
    }

    const { apiData } = data;

    let series = "f1";
    let seriesData = apiData.seriesData[series];
    let metaDescription = new MetaDescription(series, seriesData);
</script>
<style lang="postcss">
    :global(html) {
        font-family: 'Poppins', system-ui;
        background: theme(colors.neutral.950);
        color: theme(colors.neutral.200);
    }
</style>
<svelte:head>
    <meta name="apple-itunes-app" content="app-id=6472580786">
    <meta name="description" content="{metaDescription.metaString}">
</svelte:head>
{#if apiData}
    <div class="flex-col-center px-4 py-6 xl:px-6 xl:py-9 gap-4">
        {@render children?.()}
        <Footer />
    </div>
{/if}