import type { DataConfig, RaceData } from "$lib/types/RaceData";
import { flags } from "$lib/data/flags";

export interface SeriesData {
    allRaces: RaceData[]
    nextRaces: RaceData[]
    nextRace: RaceData
    dataConfig: DataConfig
}

export class APIData {
    seriesData: {[key: string]: SeriesData} = {}
    seriesOptions: string[] = ["f1", "f2", "f3", "f1-academy"];

    currentYear: number;
    flags: { [key: string]: string } = flags;

    constructor() {
        for (let series of this.seriesOptions) {
            this.seriesData[series] = {} as SeriesData
        }

        this.currentYear = new Date().getFullYear();
    }

    async getDataConfig(fetch: any, series: string) {
        const configURL = new URL('https://raw.githubusercontent.com');
        configURL.pathname = `sportstimes/f1/main/_db/${series}/config.json`;

        try {
            const res = await fetch(configURL);
            return await res.json();
        } catch (e) {
            return
        }
    }

    async getAllRaces(fetch: any, series: string) {
        const apiURL = new URL('https://raw.githubusercontent.com');
        apiURL.pathname = `sportstimes/f1/main/_db/${series}/${this.currentYear}.json`;

        try {
            const res = await fetch(apiURL);
            const data = await res.json();
            let races: RaceData[] = data['races']
            races = races.map(race => {
                // Add Flag
                let flag = flags[race.localeKey]
                if (!flag) return race
                race.flag = flag
                return race
            })
            console.log(races)
            return data['races']
        } catch (e) {
            console.error(e);

            return []
        }
    }

    getNextRaces(allRaces: RaceData[]): RaceData[] {
        let nextRaces = allRaces.filter((race: RaceData): boolean => {
            const lastSessionDate: string | undefined = Object.values(race.sessions).at(-1);
            const lastSessionTimestamp: number = lastSessionDate ? new Date(lastSessionDate).getTime() : 0;

            const currentTimestamp: number = new Date().getTime();
            return lastSessionTimestamp > currentTimestamp
        })

        if (nextRaces.length > 0) {
            return nextRaces
        } else {
            let lastRace = allRaces.at(-1)

            return lastRace ? [lastRace] : [{} as RaceData]
        }
    }
}