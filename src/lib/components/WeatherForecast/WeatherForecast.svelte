<script lang="ts">
    // Type imports
    import type { Event } from "$lib/types/Data";
    import type { HourlyForecast, DailyForecast } from "$lib/components/WeatherForecast/Forecast/Forecast";

    // Component imports
    import Forecast from "$lib/components/WeatherForecast/Forecast/Forecast.svelte";

    // Class imports
    import { WeatherForecast } from "$lib/components/WeatherForecast/WeatherForecast";

    // Function imports
    import { onMount } from "svelte";

    export let event: Event, sessionName: string | undefined;

    const sessions = event.sessions;
    const sessionDate = sessionName ? sessions[sessionName.toLowerCase()] : '';
    const currentTimestamp = new Date().getTime();
    const sessionTimestamp = sessionDate ? new Date(sessionDate).getTime() : 0;
    const deltaInDays = (sessionTimestamp - currentTimestamp) / 1000 / 60 / 60 / 24;
    let accuracy, forecastData: HourlyForecast | DailyForecast;

    if (deltaInDays < 4) {
        accuracy = 'hourly';
    } else if (4 <= deltaInDays && deltaInDays < 16) {
        accuracy = 'daily';
    } else {
        accuracy = 'climate';
    }

    const forecast = new WeatherForecast(event, sessionName, accuracy);

    onMount(async() => {
        forecastData = await forecast.getWeatherForecast();
    })
</script>

{#if forecastData}
    <Forecast {forecastData} sessionDate={forecast.sessionDate} accuracy={forecast.accuracy} />
{:else}
    <i class="fa-duotone fa-loader fa-spin"></i>
{/if}