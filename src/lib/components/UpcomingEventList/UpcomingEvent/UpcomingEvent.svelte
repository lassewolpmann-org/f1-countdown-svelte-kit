<script lang="ts">
    // Function imports
    import { UpcomingEvent } from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent";

    // Type imports
    import type { Event } from "$lib/types/Data";
    import WeatherForecast from "$lib/components/WeatherForecast/WeatherForecast.svelte";

    export let event: Event;

    let upcomingEvent: UpcomingEvent;
    $: upcomingEvent = new UpcomingEvent(event)

    const toggleSessionVisibility = () => {
        upcomingEvent.sessionsHidden = !upcomingEvent.sessionsHidden
    }
</script>
<style lang="scss">
    .upcoming-event {
        display: flex;
        flex-direction: column;
        gap: 5px;

        button {
            padding: 5px 10px;

            i {
                transition: transform 200ms;
            }

            i.hidden {
                transform: rotateX(180deg);
            }
        }
    }

    .session {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 30px;

        background: var(--table-row-primary-color);
        padding: 10px 20px;
        border-radius: 10px;

        .name {
            flex: 8;
            font-weight: 500;
        }

        .date, .weather {
            flex: 4;
        }

        .date {
            font-weight: 300;

            display: flex;
            flex-direction: column;

            span:last-child {
                color: var(--secondary-text-color);
            }
        }

        .toggle-visibility {
            flex: 1;
        }
    }

    .all-sessions {
        .session {
            background: var(--table-row-secondary-color);
            border-radius: 0;
            border-bottom: 2px solid var(--table-row-primary-color);
        }

        .session:first-child {
            border-radius: 10px 10px 0 0;
        }

        .session:last-child {
            border-radius: 0 0 10px 10px;
            border-bottom: none;
        }
    }

    .all-sessions.hidden {
        display: none;
    }

    @media only screen and (max-width: 768px) {
        .upcoming-event, .session {
            font-size: 14px;
        }

        .session {
            gap: 15px;
        }
    }
</style>

<div class="upcoming-event">
    <div class="session">
        <div class="name">{upcomingEvent.eventName}</div>
        <div class="date">
            <span><i class="fa-solid fa-calendar-day"></i> {upcomingEvent.raceDate}</span>
            <span><i class="fa-solid fa-clock"></i> {upcomingEvent.raceTime}</span>
        </div>
        <div class="weather">
            <WeatherForecast {event} sessionName={upcomingEvent.sessionNames.at(-1)} />
        </div>
        <div class="toggle-visibility">
            <button on:click={toggleSessionVisibility} aria-label="Show or hide all Sessions of Event">
                <i class="fa-solid fa-chevron-up" class:hidden={upcomingEvent.sessionsHidden}></i>
            </button>
        </div>
    </div>
    <div class="all-sessions" class:hidden={upcomingEvent.sessionsHidden}>
        {#each { length: upcomingEvent.sessionNames.length } as _, i}
            <div class="session">
                <div class="name">
                    {upcomingEvent.sessionNames.at(i)}
                </div>
                <div class="date">
                    <span><i class="fa-solid fa-calendar-day"></i> {upcomingEvent.sessionDates.at(i)}</span>
                    <span><i class="fa-solid fa-clock"></i> {upcomingEvent.sessionTimes.at(i)}</span>
                </div>
                <div class="weather">
                    <WeatherForecast {event} sessionName={upcomingEvent.sessionNames.at(i)} />
                </div>
                <div class="toggle-visibility"></div>
            </div>
        {/each}
    </div>
</div>
