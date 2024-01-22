import type { RaceData } from "$lib/types/RaceData";

export class MetaDescription {
    metaString: string;

    constructor(series: string, nextRace: RaceData, sessions: { [key: string]: string }) {
        const firstSessionDate = Object.values(sessions).at(0);
        const eventYear = firstSessionDate ? new Date(firstSessionDate).getFullYear() : new Date().getFullYear();

        let metaString = `When is the next ${series.toUpperCase()} race? Countdown to the ${eventYear}`;

        const raceName = `${nextRace.name} Grand Prix`;
        const sessionNames = Object.keys(sessions).map((session) => session.toUpperCase());

        metaString = metaString.concat(` ${series.toUpperCase()} ${raceName} ${sessionNames.join(', ')}.`);

        this.metaString = metaString;
    }
}