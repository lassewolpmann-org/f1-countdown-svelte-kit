import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { RaceData } from "$lib/types/RaceData";

export const GET: RequestHandler = () => {
    // Source: https://www.formula1.com/en/racing/2024/Pre-Season-Testing.html

    const preSeasonTesting: RaceData = {
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

    return json(preSeasonTesting)
};