import { APIData } from "$lib/classes/APIData";
import type { LayoutLoad } from "./$types";
import type { RaceData } from "$lib/types/RaceData";

export const load: LayoutLoad = (async ({ fetch }: any) => {
    const apiData: APIData = new APIData();

    for (let series of apiData.seriesOptions) {
        let seriesData = apiData.seriesData[series];

        if (!seriesData) continue

        seriesData.dataConfig = await apiData.getDataConfig(fetch, series);
        seriesData.allRaces = await apiData.getAllRaces(fetch, series, seriesData.dataConfig);
        seriesData.nextRaces = apiData.getNextRaces(seriesData.allRaces);

        let nextRace = seriesData.nextRaces.at(0)
        seriesData.nextRace = nextRace ? nextRace : {} as RaceData

        apiData.seriesData[series] = seriesData
    }

    return {
        apiData
    }
});