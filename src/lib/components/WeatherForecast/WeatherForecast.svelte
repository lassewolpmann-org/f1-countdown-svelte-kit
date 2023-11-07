<script lang="ts">
    import type { Event } from "$lib/types/Data"
    import { WeatherForecast } from "$lib/components/WeatherForecast/WeatherForecast";
    import Forecast from "$lib/components/WeatherForecast/Forecast/Forecast.svelte";

    export let event: Event, sessionName: string | undefined;

    const forecast = new WeatherForecast(event, sessionName);
</script>
<style lang="scss">

</style>
<div class="weather-forecast">
    {#await forecast.getWeatherForecast()}
        <i class="fa-duotone fa-loader fa-spin"></i>
    {:then forecastData}
        <Forecast {forecastData} sessionDate={forecast.sessionDate} />
    {:catch error}
        <p>{error}</p>
    {/await}
</div>