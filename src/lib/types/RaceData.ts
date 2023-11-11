export interface RaceData {
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    round: number;
    slug: string;
    localeKey: string;
    sessions: { [key: string]: string };
}
