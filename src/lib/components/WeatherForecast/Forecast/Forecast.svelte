<script lang="ts">
    import { Forecast } from "$lib/components/WeatherForecast/Forecast/Forecast";

    export let forecastData, sessionDate;

    const forecast = new Forecast(forecastData, sessionDate);
</script>
<style lang="scss">
    .forecast {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        .temp {
            color: var(--main-text-color);
        }

        .rain {
            color: var(--secondary-text-color);
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
    {#if forecast.weatherAvailable}
        <span class="temp"><i class="fa-regular fa-temperature-sun"></i> {forecast.temp} °C</span>
        <span class="rain"><i class="fa-solid fa-cloud-rain"></i> {forecast.rain}%</span>
    {/if}
</div>