<script lang="ts">
    // Type imports
    import type { RaceData } from "$lib/types/RaceData";
    import type { HourlyForecast, DailyForecast } from "$lib/components/UpcomingEventList/UpcomingEvent/Session/WeatherForecast/WeatherForecast";

    // Class imports
    import { WeatherForecast } from "$lib/components/UpcomingEventList/UpcomingEvent/Session/WeatherForecast/WeatherForecast";

    export let event: RaceData, sessionName: string | undefined, hourlyForecast: HourlyForecast, dailyForecast: DailyForecast, climateForecast: DailyForecast;

    const forecast = new WeatherForecast(event, sessionName, hourlyForecast, dailyForecast, climateForecast);
</script>
<style lang="scss">
    .forecast {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;

        color: var(--secondary-text-color);

        .temp {
            font-weight: 500;
        }

        .rain {
            font-weight: 300;
        }
    }

    @media only screen and (max-width: 768px) {
        .forecast {
            font-size: 14px;
        }
    }
</style>
<div class="forecast">
    {#if new Date().getTime() < forecast.sessionTimestamp}
        <span class="temp">{forecast.temp} °C <i class="fa-regular fa-temperature-sun"></i></span>
        <span class="rain">{forecast.rain} mm <i class="fa-solid fa-cloud-rain"></i></span>
    {:else}
        <span class="temp">- °C <i class="fa-regular fa-temperature-sun"></i></span>
        <span class="rain">- mm <i class="fa-solid fa-cloud-rain"></i></span>
    {/if}
</div>