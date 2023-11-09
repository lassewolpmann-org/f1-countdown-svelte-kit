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
        night: number
    },
    rain: number
}

export class Forecast {
    public sessionDate: Date;
    public temp: number = 0;
    public rain: number = 0;
    public weatherAvailable: boolean = false;

    constructor(forecastData: HourlyForecast | DailyForecast, sessionDate: string, accuracy: string) {
        this.sessionDate = new Date(sessionDate);

        if (accuracy === 'hourly') {
            this.getHourlyWeather(forecastData as HourlyForecast);
        } else if (accuracy === 'daily' || accuracy === 'climate') {
            this.getDailyWeather(forecastData as DailyForecast);
        }
    }

    filterWeather(forecast: DailyForecast): DailyWeather[] {
        return forecast.list.filter((weather: DailyWeather): boolean => {
            const weatherTimestamp: number = weather.dt * 1000;
            const weatherDate: Date = new Date(weatherTimestamp);
            const weatherTimezoneOffset: number = forecast.city.timezone / 60 / 60;
            const weatherDateTimezoneOffset: number = weatherDate.getTimezoneOffset() / 60;

            weatherDate.setHours(weatherDate.getHours() + weatherTimezoneOffset + weatherDateTimezoneOffset)

            return weatherDate.getDate() === this.sessionDate.getDate()
        });
    }

    getHourlyWeather(forecastData: HourlyForecast) {
        const filteredForecast = forecastData.list.filter((weather: HourlyWeather) => {
            return weather.dt * 1000 > this.sessionDate.getTime()
        })

        const sessionWeather: HourlyWeather | undefined = filteredForecast.at(0);
        if (sessionWeather && (new Date() < this.sessionDate)) {
            this.temp = Math.round(sessionWeather.main.temp);
            this.rain = Math.round(sessionWeather.rain["1h"]);
            this.weatherAvailable = true;
        }
    }

    getDailyWeather(forecastData: DailyForecast) {
        this.sessionDate.setHours(this.sessionDate.getHours() + forecastData.city.timezone / 60 / 60 + this.sessionDate.getTimezoneOffset() / 60);
        const filteredForecast = forecastData.list.filter((weather: DailyWeather) => {
            const weatherDate = new Date(weather.dt * 1000);
            weatherDate.setHours(weatherDate.getHours() + forecastData.city.timezone / 60 / 60 + weatherDate.getTimezoneOffset())
            return new Date(weather.dt * 1000).getDate() === this.sessionDate.getDate();
        })

        const sessionWeather: DailyWeather | undefined = filteredForecast.at(0);
        if (sessionWeather && (new Date() < this.sessionDate)) {
            let temp: number;
            const sessionHour: number = this.sessionDate.getHours();

            if (0 <= sessionHour && sessionHour < 9) {
                temp = sessionWeather.temp.morn;
            } else if (9 <= sessionHour && sessionHour < 15) {
                temp = sessionWeather.temp.day;
            } else if (15 <= sessionHour && sessionHour < 21) {
                temp = sessionWeather.temp.eve;
            } else {
                temp = sessionWeather.temp.night;
            }

            this.temp = Math.round(temp);
            this.rain = sessionWeather.rain ? Math.round(sessionWeather.rain) : 0;
            this.weatherAvailable = true;
        }
    }

    getLocalHour(timezone: number) {
        const date = this.sessionDate;
        date.setHours(date.getHours() + timezone / 60 / 60 + this.sessionDate.getTimezoneOffset() / 60);

        return date.getHours();
    }
}