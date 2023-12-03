export interface RaceData {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    round: number;
    slug: string;
    localeKey: string;
    tbc: boolean;
    sessions: { [key: string]: string };
}

export interface DataConfig {
    availableYears: [number],
    sessions: [string],
    sessionLengths: { [key: string]: number}
}