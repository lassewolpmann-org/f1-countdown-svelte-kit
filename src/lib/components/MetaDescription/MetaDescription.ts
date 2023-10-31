import type { SeriesData, Event } from "$lib/types/Data";

export class MetaDescription {
    seriesData: SeriesData;
    seriesName: string;
    nextEvent: Event;

    descriptionString: string;

    constructor(seriesName: string, seriesData: SeriesData, nextEvent: Event) {
        this.seriesData = seriesData;
        this.seriesName = seriesName;
        this.nextEvent = nextEvent ? nextEvent : {} as Event;

        this.descriptionString = this.createDescriptionString();
    }

    createDescriptionString(): string {
        let dString = `When is the next ${this.seriesName.toUpperCase()} race? Countdown to the `

        const nextEventYear = this.getEventYear(this.nextEvent);
        const nextEventName = `${this.nextEvent.name} Grand Prix`;
        const nextEventSessions = Object.keys(this.nextEvent.sessions).map((sessionName => sessionName.toUpperCase()));

        dString = dString.concat(`${nextEventYear} ${this.seriesName.toUpperCase()} ${nextEventName} ${nextEventSessions.join(', ')}.`)

        return dString
    }

    getEventYear(event: Event): number {
        const eventSessions = event.sessions;
        const raceYear = Object.values(eventSessions).at(-1);

        if (raceYear) {
            return new Date(raceYear).getFullYear()
        } else {
            return 0
        }
    }
}