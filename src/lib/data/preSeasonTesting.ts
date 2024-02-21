import type { RaceData, DataConfig } from "$lib/types/RaceData";

export const testingConfig: DataConfig = {
    availableYears: [2024],
    sessions: ["Day 1, Day 2, Day 3"],
    sessionLengths: {
        "Day 1": 570,
        "Day 2": 570,
        "Day 3": 570
    }
}

export const testingData: RaceData = {
    name: "FORMULA 1 ARAMCO PRE-SEASON TESTING 2024",
    location: "Sakhir",
    latitude: 26.0319729,
    longitude: 50.5082522,
    round: 0,
    slug: "pre-season-testing",
    localeKey: "bahrain-grand-prix",
    tbc: false,
    sessions: {
        "Day 1": "2024-02-21T07:00:00Z",
        "Day 2": "2024-02-22T07:00:00Z",
        "Day 3": "2024-02-23T07:00:00Z"
    }
}