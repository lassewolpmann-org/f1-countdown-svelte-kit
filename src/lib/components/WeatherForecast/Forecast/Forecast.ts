interface ForecastType {
    city: {
        coord: {
            lon: number,
            lat: number
        },
        country: string,
        id: number,
        name: string,
        population: number,
        timezone: number
    },
    cnt: number,
    cod: string,
    list: Weather[],
    message: number
}

interface Weather {
    clouds: number,
    deg: number,
    dt: number,
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number
    },
    humidity: number,
    pressure: number,
    rain: number,
    speed: number,
    sunrise: number,
    sunset: number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
    weather: [WeatherDescription]
}

interface WeatherDescription {
    description: string,
    icon: string,
    id: number,
    main: string
}

export class Forecast {
    private forecast: ForecastType;
    private filteredForecast: Weather[];
    private readonly sessionDate: Date;

    public temp: number = 0;
    public rain: number = 0;
    public weatherAvailable: boolean = false;

    constructor(forecastData: ForecastType, sessionDate: string) {
        this.forecast = forecastData;

        this.sessionDate = new Date(sessionDate);
        this.sessionDate.setHours(this.sessionDate.getHours() + this.forecast.city.timezone / 60 / 60 + this.sessionDate.getTimezoneOffset() / 60);
        this.filteredForecast = this.filterWeather();

        const sessionWeather: Weather | undefined = this.filteredForecast.at(0);

        if (sessionWeather && (new Date() < this.sessionDate)) {
            const sessionHour: number = this.sessionDate.getHours();

            if (0 <= sessionHour && sessionHour < 3) {
                // Take temperature value of previous night
                const sessionWeatherIndex: number = this.forecast.list.findIndex((weather: Weather): boolean => {
                    return weather.dt === sessionWeather.dt;
                })
                const previousDayWeather: Weather | undefined = this.forecast.list.at(sessionWeatherIndex - 1);
                this.temp = previousDayWeather ? previousDayWeather.temp.night : 0;
            } else if (3 <= sessionHour && sessionHour < 9) {
                this.temp = sessionWeather.temp.morn;
            } else if (9 <= sessionHour && sessionHour < 15) {
                this.temp = sessionWeather.temp.day;
            } else if (15 <= sessionHour && sessionHour < 21) {
                this.temp = sessionWeather.temp.eve;
            } else {
                this.temp = sessionWeather.temp.night;
            }

            this.temp = Math.round(this.temp);
            this.rain = sessionWeather.rain ? Math.round(sessionWeather.rain) : 0;

            this.weatherAvailable = true;
        }
    }

    filterWeather(): Weather[] {
        return this.forecast.list.filter((weather: Weather): boolean => {
            const weatherTimestamp: number = weather.dt * 1000;
            const weatherDate: Date = new Date(weatherTimestamp);
            const weatherTimezoneOffset: number = this.forecast.city.timezone / 60 / 60;
            const weatherDateTimezoneOffset: number = weatherDate.getTimezoneOffset() / 60;

            weatherDate.setHours(weatherDate.getHours() + weatherTimezoneOffset + weatherDateTimezoneOffset)

            return weatherDate.getDate() === this.sessionDate.getDate()
        });
    }
}