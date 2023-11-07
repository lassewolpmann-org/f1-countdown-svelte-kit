import type {Event} from "$lib/types/Data"
import {PUBLIC_OPEN_WEATHER_MAP_API_KEY} from "$env/static/public"

export class WeatherForecast {
    private readonly apiKey: string;

    private event: Event;
    private readonly sessionName: string;

    private latitude: number;
    private longitude: number;

    private readonly sessions: { [key: string]: string };

    sessionDate: string | undefined;

    constructor(event: Event, sessionName: string | undefined) {
        this.apiKey = PUBLIC_OPEN_WEATHER_MAP_API_KEY;

        this.event = event;
        this.sessionName = sessionName ? sessionName.toLowerCase() : "";

        this.latitude = this.event.latitude;
        this.longitude = this.event.longitude;

        this.sessions = this.event.sessions;

        this.sessionDate = this.sessions[this.sessionName];
    }

    async getWeatherForecast() {
        // TODO: Make forecast more accurate if session is closer
        const apiURL: URL = new URL('https://pro.openweathermap.org/data/2.5/forecast/climate');
        apiURL.searchParams.append('lat', this.latitude.toString());
        apiURL.searchParams.append('lon', this.longitude.toString());
        apiURL.searchParams.append('appid', this.apiKey);
        apiURL.searchParams.append('cnt', '30');
        apiURL.searchParams.append('units', 'metric');

        const res = await fetch(apiURL);
        return await res.json();
    }
}