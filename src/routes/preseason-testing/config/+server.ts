import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { DataConfig } from "$lib/types/RaceData";

export const GET: RequestHandler = () => {
    // Source: https://www.formula1.com/en/racing/2024/Pre-Season-Testing.html

    const config: DataConfig = {
        availableYears: [2024],
        sessions: ["Day 1, Day 2, Day 3"],
        sessionLengths: {
            "Day 1": 570,
            "Day 2": 570,
            "Day 3": 570
        }
    }

    return json(config)
};