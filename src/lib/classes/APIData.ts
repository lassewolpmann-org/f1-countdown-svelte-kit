import type {DataConfig, RaceData} from "$lib/types/RaceData";
import type { CarLaunch } from "$lib/types/CarLaunch";
import { error } from "@sveltejs/kit";

export class APIData {
    allRaces: RaceData[] = [];
    series: string;
    currentYear: number;

    nextRaces: RaceData[] = [];
    nextRace: RaceData = {} as RaceData;

    carLaunches: CarLaunch[] = [];

    preSeasonTesting: RaceData = {} as RaceData;
    preSeasonTestingConfig: DataConfig = {} as DataConfig;

    flags: { [key: string]: string } = {} as { [key: string]: string };

    nextRaceSessions: { [key: string]: string } = {} as { [key: string]: string };
    dataConfig: DataConfig = {} as DataConfig;

    constructor() {
        this.series = 'f2';
        this.currentYear = new Date().getFullYear();
    }

    async getDataConfig(fetch: any) {
        const configURL = new URL('https://raw.githubusercontent.com');
        configURL.pathname = `sportstimes/f1/main/_db/${this.series}/config.json`;

        const res = await fetch(configURL);
        if (!res.ok) throw error(404, "Couldn't retrieve Config from API")

        return await res.json();
    }

    async getAllRaces(fetch: any, year: number) {
        const apiURL = new URL('https://raw.githubusercontent.com');
        apiURL.pathname = `sportstimes/f1/main/_db/${this.series}/${year}.json`;

        const res = await fetch(apiURL);
        if (!res.ok) throw error(404, "Couldn't retrieve data from API")

        const data = await res.json();
        return data['races']
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
        if (nextRace) this.nextRaceSessions = nextRace.sessions;

        return nextRaces
    }
}