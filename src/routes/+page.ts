/** @type {import('./$types').PageLoad} */
import type { RaceData } from "$lib/types/RaceData";
import { error } from '@sveltejs/kit';

class APIData {
    allRaces: RaceData[];
    series: string;
    currentYear: number;
    apiURL: URL;
    nextRaces: RaceData[];
    nextRace: RaceData;
    nextRaceSessions: { [key: string]: string };

    constructor() {
        this.allRaces = [];
        this.nextRaces = [];
        this.nextRace = {} as RaceData;
        this.nextRaceSessions = {} as { [key: string]: string };

        this.series = 'f1';
        this.currentYear = new Date().getFullYear();
        this.apiURL = new URL('https://raw.githubusercontent.com');
        this.apiURL.pathname = `sportstimes/f1/main/_db/${this.series}/${this.currentYear}.json`;
    }

    async getAllRaces(fetch: any) {
        const res = await fetch(this.apiURL);

        if (res.ok) {
            const data = await res.json();
            return data['races']
        } else {
            throw error(404, "Couldn't retrieve data from API")
        }
    }

    getNextRaces(): RaceData[] {
        let nextRaces: RaceData[] = this.allRaces.filter((race: RaceData): boolean => {
            const lastSessionDate: string | undefined = Object.values(race.sessions).at(-1);
            const lastSessionTimestamp: number = lastSessionDate ? new Date(lastSessionDate).getTime() : 0;

            const currentTimestamp: number = new Date().getTime();

            // For debug purposes
            // const currentTimestamp = new Date('2023-12-31').getTime();

            return lastSessionTimestamp > currentTimestamp
        })

        if (nextRaces.length === 0) {
            const lastRaceOfSeason: RaceData | undefined = this.allRaces.at(-1);
            if (lastRaceOfSeason) nextRaces = [lastRaceOfSeason];
        }

        const nextRace: RaceData | undefined = nextRaces.at(0);
        if (nextRace) this.nextRace = nextRace;
        if (nextRace) this.nextRaceSessions = nextRace.sessions;

        return nextRaces
    }
}

export const load = (async ({ fetch }: any) => {
    const apiData: APIData = new APIData();
    apiData.allRaces = await apiData.getAllRaces(fetch);
    apiData.nextRaces = apiData.getNextRaces();

    return {
        apiData
    }
});