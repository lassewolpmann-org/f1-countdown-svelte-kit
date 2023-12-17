<script lang="ts">
    // Function imports
    import { UpcomingEvent } from "$lib/components/UpcomingEventList/UpcomingEvent/UpcomingEvent";

    // Type imports
    import type { RaceData } from "$lib/types/RaceData";

    // Component imports
    import Body from "$lib/components/UpcomingEventList/UpcomingEvent/Session/Body.svelte";

    export let event: RaceData;

    const upcomingEvent = new UpcomingEvent(event);

    const toggleSessionVisibility = () => {
        upcomingEvent.sessionsHidden = !upcomingEvent.sessionsHidden
    }

    const isInPast = (sessionDateTime: string | undefined): boolean => {
        if (sessionDateTime) {
            const currentTimestamp = new Date().getTime();
            const sessionTimestamp = new Date(sessionDateTime).getTime();

            return sessionTimestamp < currentTimestamp
        } else {
            return false
        }
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
        flex-direction: column;
        gap: 15px;

        background: var(--table-row-primary-color);
        padding: 12px 25px;
        border-radius: 10px;

        .head {
            font-weight: 600;
            padding-bottom: 12px;
            border-bottom: 2px solid var(--table-row-secondary-color);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .tbc {
                background: var(--main-text-color);
                color: var(--table-row-primary-color);
                padding: 1px 5px;
                margin-right: 3px;
                border-radius: 3px;
                font-size: 14px;
            }
        }

        .checkmark {
            opacity: 0;
            font-size: 20px;
        }
    }

    .session.inPast {
        color: var(--secondary-text-color);

        .checkmark {
            opacity: 1;
        }
    }

    .all-sessions {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .session {
            background: var(--table-row-secondary-color);
            padding: 8px 25px;

            .head {
                border-bottom: 2px solid var(--table-row-primary-color);
                padding-bottom: 8px;
            }
        }
    }

    .all-sessions.hidden {
        display: none;
    }

    @media only screen and (max-width: 768px) {
        .upcoming-event, .session {
            font-size: 14px;

            .checkmark {
                font-size: 18px;
            }
        }
    }
</style>

<div class="upcoming-event">
    <div class="session">
        <div class="head">
            <span class="name"><span class="tbc">{upcomingEvent.event.tbc ? "TBC" : ""}</span> {upcomingEvent.eventName}</span>
            <button on:click={toggleSessionVisibility}>
                <i class="fa-solid fa-chevron-up" class:hidden={upcomingEvent.sessionsHidden}></i>
            </button>
        </div>
        <Body
                date={upcomingEvent.raceDate}
                time={upcomingEvent.raceTime}
        />
    </div>
    <div class="all-sessions" class:hidden={upcomingEvent.sessionsHidden}>
        {#each { length: upcomingEvent.sessionNames.length } as _, i}
            <div class="session" class:inPast={isInPast(upcomingEvent.sessionsDateTime.at(i))}>
                <div class="head">
                    <span class="name">{upcomingEvent.sessionNames.at(i)}</span>
                    <span class="checkmark"><i class="fa-solid fa-flag-checkered"></i></span>
                </div>
                <Body
                        date={upcomingEvent.sessionDates.at(i)}
                        time={upcomingEvent.sessionTimes.at(i)}
                />
            </div>
        {/each}
    </div>
</div>
