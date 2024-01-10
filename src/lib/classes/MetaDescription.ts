import type { RaceData } from "$lib/types/RaceData";

export class MetaDescription {
    descriptionString: string;

    constructor(series: string, nextRace: RaceData, sessions: { [key: string]: string }) {
        let dString = `When is the next ${series.toUpperCase()} race? Countdown to the ${new Date().getFullYear()}`;

        const raceName = `${nextRace.name} Grand Prix`;
        const sessionNames = Object.keys(sessions).map((session) => session.toUpperCase());

        dString = dString.concat(` ${series.toUpperCase()} ${raceName} ${sessionNames.join(', ')}.`);

        this.descriptionString = dString;
    }
}