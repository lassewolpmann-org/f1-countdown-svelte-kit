import type { RaceData } from "$lib/types/RaceData";

export interface HourlyForecast {
    city: {
        timezone: number
    },
    list: HourlyWeather[]
}

export interface DailyForecast {
    city: {
        timezone: number
    },
    list: DailyWeather[]
}

interface HourlyWeather {
    dt: number,
    main: {
        temp: number
    },
    rain: {
        '1h': number
    }
}

interface DailyWeather {
    dt: number,
    temp: {
        morn: number,
        day: number,
        eve: number,
        night: number,
        max: number,
        min: number
    },
    rain: number
}

export class WeatherForecast {
    private event: RaceData;
    private readonly sessionName: string;
    private readonly sessions: { [key: string]: string };
    sessionDate: string | undefined;
    sessionTimestamp: number;

    temp: string;
    rain: string;

    constructor(event: RaceData, sessionName: string | undefined, hourlyForecast: HourlyForecast, dailyForecast: DailyForecast, climateForecast: DailyForecast) {
        this.event = event;
        this.sessionName = sessionName ? sessionName.toLowerCase() : "";
        this.sessions = this.event.sessions;
        this.sessionDate = this.sessions[this.sessionName];
        this.sessionTimestamp = this.sessionDate ? new Date(this.sessionDate).getTime() : 0;

        const filteredHourly: HourlyWeather | undefined = hourlyForecast.list.filter((weather: HourlyWeather): boolean => {
            return weather.dt * 1000 >= this.sessionTimestamp;
        }).at(0)

        const filteredDaily: DailyWeather | undefined = dailyForecast.list.filter((weather: DailyWeather): boolean => {
            return weather.dt * 1000 >= this.sessionTimestamp;
        }).at(0)

        const filteredClimate: DailyWeather | undefined = climateForecast.list.filter((weather: DailyWeather): boolean => {
            return weather.dt * 1000 >= this.sessionTimestamp;
        }).at(0)

        if (filteredHourly) {
            this.temp = Math.round(filteredHourly.main.temp).toString();
            this.rain = filteredHourly.rain ? Math.round(filteredHourly.rain["1h"]).toString() : '0';
        } else if (filteredDaily) {
            const averageTemp = (filteredDaily.temp.max + filteredDaily.temp.min) / 2;
            this.temp = Math.round(averageTemp).toString();
            this.rain = filteredDaily.rain ? Math.round(filteredDaily.rain).toString() : '0';
        } else if (filteredClimate) {
            const averageTemp = (filteredClimate.temp.max + filteredClimate.temp.min) / 2;
            this.temp = Math.round(averageTemp).toString();
            this.rain = filteredClimate.rain ? Math.round(filteredClimate.rain).toString() : '0';
        } else {
            this.temp = '-';
            this.rain = '-';
        }
    }
}