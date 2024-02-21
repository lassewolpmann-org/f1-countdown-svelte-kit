import { APIData } from "$lib/classes/APIData";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = (async ({ fetch }: any) => {
    const apiData: APIData = new APIData();

    // API data config
    apiData.dataConfig = await apiData.getDataConfig(fetch);

    // Next races in season
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