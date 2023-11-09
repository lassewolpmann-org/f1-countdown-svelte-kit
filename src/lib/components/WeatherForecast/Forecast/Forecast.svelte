<script lang="ts">
    import { Forecast } from "$lib/components/WeatherForecast/Forecast/Forecast";

    export let forecastData, sessionDate, accuracy;

    const forecast = new Forecast(forecastData, sessionDate, accuracy);
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
    {#if forecast.weatherAvailable}
        <span class="temp">{forecast.temp} °C <i class="fa-regular fa-temperature-sun"></i></span>
        <span class="rain">{forecast.rain} mm <i class="fa-solid fa-cloud-rain"></i></span>
    {:else}
        <span class="temp"><i class="fa-regular fa-temperature-sun"></i> - °C</span>
        <span class="rain"><i class="fa-solid fa-cloud-rain"></i> - mm</span>
    {/if}
</div>