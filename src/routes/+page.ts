/** @type {import('./$types').PageLoad} */
import type { RaceData, DataConfig } from "$lib/types/RaceData";
import { error } from '@sveltejs/kit';

class APIData {
    allRaces: RaceData[];
    series: string;
    currentYear: number;
    nextRaces: RaceData[];
    nextRace: RaceData;
    nextRaceSessions: { [key: string]: string };
    dataConfig: DataConfig;

    constructor() {
        this.allRaces = [];
        this.nextRaces = [];
        this.nextRace = {} as RaceData;
        this.nextRaceSessions = {} as { [key: string]: string };
        this.dataConfig = {} as DataConfig;

        this.series = 'f1';
        this.currentYear = new Date().getFullYear();
    }

    async getDataConfig(fetch: any) {
        const configURL = new URL('https://raw.githubusercontent.com');
        configURL.pathname = `sportstimes/f1/main/_db/${this.series}/config.json`;

        const res = await fetch(configURL);

        if (res.ok) {
            return await res.json();
        } else {
            throw error(404, "Couldn't retrieve config from API")
        }
    }

    async getAllRaces(fetch: any, year: number) {
        const apiURL = new URL('https://raw.githubusercontent.com');
        apiURL.pathname = `sportstimes/f1/main/_db/${this.series}/${year}.json`;

        const res = await fetch(apiURL);

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

        const nextRace: RaceData | undefined = nextRaces.at(0);
        if (nextRace) this.nextRace = nextRace;
        if (nextRace) this.nextRaceSessions = nextRace.sessions;

        return nextRaces
    }
}

export const load = (async ({ fetch }: any) => {
    const apiData: APIData = new APIData();
    apiData.dataConfig = await apiData.getDataConfig(fetch);
    apiData.allRaces = await apiData.getAllRaces(fetch, apiData.currentYear);
    const nextRaces = apiData.getNextRaces();

    // Switch to next year if no races are upcoming
    const nextYear = apiData.currentYear + 1;
    if (nextRaces.length === 0 && apiData.dataConfig.availableYears.includes(nextYear)) {
        apiData.allRaces = await apiData.getAllRaces(fetch, nextYear);
        apiData.nextRaces = apiData.getNextRaces();
    } else {
        apiData.nextRaces = nextRaces;
    }

    return {
        apiData
    }
});