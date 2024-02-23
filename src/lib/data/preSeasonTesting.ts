import type { RaceData, DataConfig } from "$lib/types/RaceData";

export const testingConfig: DataConfig = {
    availableYears: [2024],
    sessions: ["Day 1 - Morning, Day 1 - Afternoon, Day 2 - Morning, Day 2 - Afternoon, Day 3 - Morning, Day 3 - Afternoon"],
    sessionLengths: {
        "Day 1 - Morning": 240,
        "Day 1 - Afternoon": 240,
        "Day 2 - Morning": 180,
        "Day 2 - Afternoon": 300,
        "Day 3 - Morning": 30,
        "Day 3 - Afternoon": 440
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
        "Day 1 - Morning": "2024-02-21T07:00:00Z",
        "Day 1 - Afternoon": "2024-02-21T12:00:00Z",
        "Day 2 - Morning": "2024-02-22T07:00:00Z",
        "Day 2 - Afternoon": "2024-02-22T11:10:00Z",
        "Day 3 - Morning": "2024-02-23T07:00:00Z",
        "Day 3 - Afternoon": "2024-02-23T08:50:00Z"
    }
}