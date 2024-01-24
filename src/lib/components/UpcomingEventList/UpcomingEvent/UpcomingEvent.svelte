<script lang="ts">
    // Class imports
    import { UpcomingEvent } from "$lib/classes/UpcomingEvent";

    // Type imports
    import type {DataConfig, RaceData} from "$lib/types/RaceData";

    // Component imports
    import Body from "$lib/components/UpcomingEventList/UpcomingEvent/SessionBody.svelte";

    export let event: RaceData, flags: {[key: string]: string}, dataConfig: DataConfig;

    const upcomingEvent = new UpcomingEvent(event, flags, dataConfig);

    const toggleSessionVisibility = () => {
        upcomingEvent.sessionsHidden = !upcomingEvent.sessionsHidden
    }

    const isInPast = (sessionDateTime: string | undefined): boolean => {
        if (!sessionDateTime) return false

        const currentTimestamp = new Date().getTime();
        const sessionTimestamp = new Date(sessionDateTime).getTime();

        return sessionTimestamp < currentTimestamp
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
            <span class="name">{upcomingEvent.flag} {upcomingEvent.eventName}</span>
            <button on:click={toggleSessionVisibility}>
                <i class="fa-solid fa-chevron-up" class:hidden={upcomingEvent.sessionsHidden}></i>
            </button>
        </div>
        <Body
                date={upcomingEvent.sessionDates.at(-1)}
                time={upcomingEvent.sessionTimes.at(-1)}
                endTime={upcomingEvent.sessionEndTimes.at(-1)}
                tbc={upcomingEvent.event.tbc}
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
                        endTime={upcomingEvent.sessionEndTimes.at(i)}
                        tbc={upcomingEvent.event.tbc}
                />
            </div>
        {/each}
    </div>
</div>
