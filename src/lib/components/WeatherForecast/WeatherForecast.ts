import type {Event} from "$lib/types/Data"
import { PUBLIC_OPEN_WEATHER_MAP_API_KEY } from "$env/static/public"
import { error } from "@sveltejs/kit";

export class WeatherForecast {
    private readonly apiKey: string;

    private event: Event;
    private readonly sessionName: string;

    private latitude: number;
    private longitude: number;

    private readonly sessions: { [key: string]: string };

    sessionDate: string | undefined;

    public accuracy: string;

    constructor(event: Event, sessionName: string | undefined, accuracy: string) {
        this.apiKey = PUBLIC_OPEN_WEATHER_MAP_API_KEY;

        this.event = event;
        this.sessionName = sessionName ? sessionName.toLowerCase() : "";

        this.latitude = this.event.latitude;
        this.longitude = this.event.longitude;

        this.sessions = this.event.sessions;

        this.sessionDate = this.sessions[this.sessionName];

        this.accuracy = accuracy;
    }

    async getWeatherForecast() {
        // TODO: Make forecast more accurate if session is closer
        if (this.accuracy) {
            let apiURL: URL;

            if (this.accuracy === 'hourly') {
                apiURL = new URL('https://pro.openweathermap.org/data/2.5/forecast/hourly');
                apiURL.searchParams.append('cnt', '96');
            } else if (this.accuracy === 'daily') {
                apiURL = new URL('https://api.openweathermap.org/data/2.5/forecast/daily');
                apiURL.searchParams.append('cnt', '16');
            } else if (this.accuracy === 'climate') {
                apiURL = new URL('https://pro.openweathermap.org/data/2.5/forecast/climate');
                apiURL.searchParams.append('cnt', '30');
            } else {
                throw error(404, {
                    message: "Couldn't retrieve data from Weather API"
                })
            }

            apiURL.searchParams.append('lat', this.latitude.toString());
            apiURL.searchParams.append('lon', this.longitude.toString());
            apiURL.searchParams.append('appid', this.apiKey);
            apiURL.searchParams.append('units', 'metric');

            const res = await fetch(apiURL);
            return await res.json();
        } else {
            throw error(404, {
                message: "Couldn't retrieve data from Weather API"
            })
        }
    }
}