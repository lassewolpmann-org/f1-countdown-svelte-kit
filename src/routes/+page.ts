/** @type {import('./$types').PageLoad} */
import type { Event, SeriesData } from "$lib/types/Data";
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }: any) => {
    const seriesName: string = 'f2';
    const seriesData: SeriesData = {} as SeriesData;

    const allEvents = await getAllEvents(seriesName, fetch);
    seriesData.nextEvents = getNextEvents(allEvents);
    seriesData.previousEvent = getPreviousEvent(allEvents, seriesData.nextEvents);

    if (!seriesData) throw error(404, {
        message: "Couldn't retrieve data from API"
    })

    return {
        seriesData: seriesData,
        seriesName: seriesName
    }
});

async function getAllEvents(series: string, fetch: any) {
    const currentYear: number = new Date().getFullYear();

    const apiURL: URL = new URL(`https://raw.githubusercontent.com/sportstimes/f1/main/_db/${series}/${currentYear}.json`);
    const res: Response = await fetch(apiURL);

    const allEvents = await res.json();

    return allEvents['races']
}

function getNextEvents(allEvents: Array<Event>): Event[] {
    const timestamp: number = new Date().getTime();
    // const timestamp: number = new Date('2023-10-30').getTime();

    let nextEvents: Array<Event> = allEvents.filter((event: Event): boolean => {
        const eventSessions: object = event['sessions'];
        const eventSessionTimestamps: string[] = Object.values(eventSessions);

        const raceEndTime: string | undefined = eventSessionTimestamps.at(-1);

        return raceEndTime ? new Date(raceEndTime).getTime() > timestamp : false
    })

    if (nextEvents.length === 0) {
        const lastEvent: Event | undefined = allEvents.at(-1);
        if (lastEvent) nextEvents = [lastEvent];
    }

    return nextEvents
}

function getPreviousEvent(allEvents: Array<Event>, nextEvents: Array<Event>): Event {
    let previousEvent;

    if (allEvents.length === nextEvents.length) {
        previousEvent = allEvents.at(-1);
    } else {
        const previousEventIndex = allEvents.length - nextEvents.length - 1;
        previousEvent = allEvents.at(previousEventIndex);
    }

    if (!previousEvent) previousEvent = {} as Event

    return previousEvent
}