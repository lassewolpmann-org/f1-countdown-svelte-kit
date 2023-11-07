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

        font-size: 16px;

        .max {
            color: var(--main-text-color);
        }

        .min {
            color: var(--secondary-text-color);
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
        <div class="max">
            <i class="fa-regular fa-temperature-sun"></i> {forecast.temp} °C
        </div>
        <div class="min">
            <i class="fa-solid fa-cloud-rain"></i> {forecast.rain}%
        </div>
    {/if}
</div>