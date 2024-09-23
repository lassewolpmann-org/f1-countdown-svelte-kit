import type { DataConfig, RaceData } from "$lib/types/RaceData";
import { flags } from "$lib/data/flags";

export class APIData {
    allRaces: RaceData[] = [];
    series: string;
    currentYear: number;

    nextRaces: RaceData[] = [];
    nextRace: RaceData = {} as RaceData;

    flags: { [key: string]: string } = flags;

    dataConfig: DataConfig = {} as DataConfig;

    constructor() {
        this.series = 'f1';
        this.currentYear = new Date().getFullYear();
    }

    async getDataConfig(fetch: any) {
        const configURL = new URL('https://raw.githubusercontent.com');
        configURL.pathname = `sportstimes/f1/main/_db/${this.series}/config.json`;

        try {
            const res = await fetch(configURL);
            return await res.json();
        } catch (e) {
            return
        }
    }

    async getAllRaces(fetch: any, year: number) {
        const apiURL = new URL('https://raw.githubusercontent.com');
        apiURL.pathname = `sportstimes/f1/main/_db/${this.series}/${year}.json`;

        try {
            const res = await fetch(apiURL);
            const data = await res.json();
            return data['races']
        } catch (e) {
            console.error(e);

            return []
        }
    }

    getNextRaces(): RaceData[] {
        let nextRaces: RaceData[] = this.allRaces.filter((race: RaceData): boolean => {
            const lastSessionDate: string | undefined = Object.values(race.sessions).at(-1);
            const lastSessionTimestamp: number = lastSessionDate ? new Date(lastSessionDate).getTime() : 0;

            const currentTimestamp: number = new Date().getTime();
            return lastSessionTimestamp > currentTimestamp
        })

        const nextRace: RaceData | undefined = nextRaces.at(0);
        if (nextRace) this.nextRace = nextRace;

        return nextRaces
    }
}