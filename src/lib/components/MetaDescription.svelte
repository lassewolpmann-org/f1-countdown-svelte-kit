<script lang="ts">
    class MetaDescription {
        metaString: string;

        constructor(series: string, nextRace: RaceData) {
            if (Object.keys(nextRace).length === 0) {
                this.metaString = `When is the next ${series.toUpperCase()} race?`;

                return
            }

            const firstSessionDate = Object.values(nextRace.sessions).at(0);
            const eventYear = firstSessionDate ? new Date(firstSessionDate).getFullYear() : new Date().getFullYear();

            let metaString = `When is the next ${series.toUpperCase()} race? Countdown to the ${eventYear}`;

            const raceName = `${nextRace.name} Grand Prix`;
            const sessionNames = Object.keys(nextRace.sessions).map((session) => session.toUpperCase());

            metaString = metaString.concat(` ${series.toUpperCase()} ${raceName} ${sessionNames.join(', ')}.`);

            this.metaString = metaString;
        }
    }

    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    export let series: string, nextRace: RaceData;

    const metaDescription = new MetaDescription(series, nextRace);
</script>

<svelte:head>
    <meta name="description" content="{metaDescription.metaString}">
</svelte:head>