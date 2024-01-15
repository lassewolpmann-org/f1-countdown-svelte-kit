<script lang="ts">
    import type { CarLaunch } from "$lib/types/CarLaunch";
    import { parseDate } from "$lib/functions/parseDate";

    export let carLaunches: CarLaunch[];
</script>
<style lang="scss">
    .car-launch {
        display: flex;
        flex-direction: column;

        background: var(--table-row-primary-color);
        padding: 12px 25px;
        border-radius: 10px;

        .head {
            font-weight: 600;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            border-bottom: 2px solid var(--table-row-secondary-color);
            padding-bottom: 12px;
        }

        .body {
            font-weight: 400;
            padding-top: 12px;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            span {
                i {
                    color: var(--secondary-text-color);
                    width: 20px;
                    padding-right: 3px;
                }
            }
        }

        .social {
            font-weight: 300;
            color: var(--secondary-text-color);

            a {
                color: inherit;
            }

            a:hover {
                color: var(--main-text-color)
            }
        }
    }

    @media only screen and (max-width: 768px) {
        .car-launch {
            font-size: 14px;
        }
    }
</style>
{#if carLaunches.length > 0}
    <h3>Car Launches</h3>
    {#each carLaunches as carLaunch}
        <div class="car-launch">
            <div class="head">
                <span class="name">{carLaunch.team_name}</span>
                {#if !carLaunch.tbc}
                    <span class="social"><a href={carLaunch.announcement} target="_blank"><i class="fa-brands fa-instagram" /></a></span>
                {/if}
            </div>
            <div class="body">
                <span><i class="fa-solid fa-calendar-day" /> {parseDate(carLaunch.date)}</span>
                <span ><i class="fa-solid fa-location-dot" /> {carLaunch.location}</span>
            </div>
        </div>
    {/each}
{/if}
