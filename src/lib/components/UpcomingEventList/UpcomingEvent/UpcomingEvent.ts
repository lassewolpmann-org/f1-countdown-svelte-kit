import type { RaceData } from "$lib/types/RaceData";
import type { DailyForecast, HourlyForecast } from "$lib/components/UpcomingEventList/UpcomingEvent/Session/WeatherForecast/WeatherForecast";
import { PUBLIC_OPEN_WEATHER_MAP_API_KEY } from "$env/static/public";

export class UpcomingEvent {
    event: RaceData
    eventName: string;

    sessionNames: string[];

    sessionsHidden: boolean;

    sessionsDateTime: string[];
    sessionDates: (string | undefined)[];
    sessionTimes: (string | undefined)[];

    raceDate: string | undefined;
    raceTime: string | undefined;

    hourlyForecast: HourlyForecast = {} as HourlyForecast;
    dailyForecast: DailyForecast = {} as DailyForecast;
    climateForecast: DailyForecast = {} as DailyForecast;
    forecastAvailable: boolean = false;

    constructor(event: RaceData) {
        this.event = event;
        this.eventName = this.parseName();

        this.sessionNames = Object.keys(this.event.sessions).map((eventName) => eventName.toUpperCase());

        this.sessionsHidden = true;

        this.sessionsDateTime = Object.values(this.event.sessions);
        this.sessionDates = this.sessionsDateTime.map(this.parseDate);
        this.sessionTimes = this.sessionsDateTime.map(this.parseTime);

        this.raceDate = this.sessionDates.at(-1);
        this.raceTime = this.sessionTimes.at(-1);
    }

    parseName() {
        if (this.event.name.includes("Grand Prix")) {
            return this.event.name
        } else {
            return this.event.name + " Grand Prix"
        }
    }

    parseDate(sessionDate: string) {
        return new Date(sessionDate).toLocaleString(undefined, {
            day: '2-digit',
            month: 'long',
            weekday: 'long'
        })
    }

    parseTime(sessionDate: string) {
        return new Date(sessionDate).toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    getHourlyForecast = async () => {
        const apiURL = new URL('https://pro.openweathermap.org/data/2.5/forecast/hourly');
        apiURL.searchParams.append('lat', this.event.latitude.toString());
        apiURL.searchParams.append('lon', this.event.longitude.toString());
        apiURL.searchParams.append('appid', PUBLIC_OPEN_WEATHER_MAP_API_KEY);
        apiURL.searchParams.append('units', 'metric');
        apiURL.searchParams.append('cnt', '96');

        const res = await fetch(apiURL);
        return await res.json()
    }

    getDailyForecast = async () => {
        const apiURL = new URL('https://api.openweathermap.org/data/2.5/forecast/daily');
        apiURL.searchParams.append('lat', this.event.latitude.toString());
        apiURL.searchParams.append('lon', this.event.longitude.toString());
        apiURL.searchParams.append('appid', PUBLIC_OPEN_WEATHER_MAP_API_KEY);
        apiURL.searchParams.append('units', 'metric');
        apiURL.searchParams.append('cnt', '16');

        const res = await fetch(apiURL);
        return await res.json()
    }

    getClimateForecast = async () => {
        const apiURL = new URL('https://pro.openweathermap.org/data/2.5/forecast/climate');
        apiURL.searchParams.append('lat', this.event.latitude.toString());
        apiURL.searchParams.append('lon', this.event.longitude.toString());
        apiURL.searchParams.append('appid', PUBLIC_OPEN_WEATHER_MAP_API_KEY);
        apiURL.searchParams.append('units', 'metric');
        apiURL.searchParams.append('cnt', '30');

        const res = await fetch(apiURL);
        return await res.json()
    }
}