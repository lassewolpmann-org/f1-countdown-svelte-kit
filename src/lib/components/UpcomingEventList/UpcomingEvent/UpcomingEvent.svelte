<script lang="ts">
    // Class imports
    import { UpcomingEvent } from "$lib/classes/UpcomingEvent";

    // Type imports
    import type {DataConfig, RaceData} from "$lib/types/RaceData";

    // Component imports
    import Body from "$lib/components/UpcomingEventList/UpcomingEvent/SessionBody.svelte";

    // Function imports
    import { isSessionInPast } from "$lib/functions/isSessionInPast";

    export let event: RaceData, flags: {[key: string]: string}, dataConfig: DataConfig;

    let innerWidth = 0;
    const upcomingEvent = new UpcomingEvent(event, flags, dataConfig);

    const isOngoing = (sessionDateTime: string | undefined, sessionName: string | undefined): boolean => {
        if (!sessionDateTime) return false
        if (!sessionName) return false

        const currentTimestamp = new Date().getTime();
        const sessionDuration = dataConfig.sessionLengths[sessionName];

        if (!sessionDuration) return false
        const sessionStartTimestamp = new Date(sessionDateTime).getTime();
        const sessionEndTimestamp = sessionStartTimestamp + (sessionDuration * 60 * 1000);

        return (sessionStartTimestamp < currentTimestamp) && (currentTimestamp < sessionEndTimestamp)
    }
</script>
<svelte:window bind:innerWidth></svelte:window>
<style lang="scss">
    .upcoming-event {
        display: flex;
        flex-direction: column;
        gap: 5px;
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

        .checkmark, .car {
            display: none;
            font-size: 20px;
        }
    }

    .session.inPast {
        color: var(--secondary-text-color);

        .checkmark {
            display: flex;
        }
    }

    .session.isOngoing {
        .car {
            display: flex;
            transform-origin: center;
            animation-name: car-moving;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }

    .all-sessions {
        display: flex;
        flex-direction: row;
        gap: 5px;
        overflow-x: scroll;

        .session {
            flex: 1 1 0px;
            background: var(--table-row-secondary-color);
            padding: 8px 25px;

            .head {
                border-bottom: 2px solid var(--table-row-primary-color);
                padding-bottom: 8px;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        .all-sessions {
            .session {
                flex: 0 0 auto;
            }
        }

        .upcoming-event, .session {
            font-size: 14px;

            .checkmark {
                font-size: 18px;
            }
        }
    }
    
    @keyframes car-moving {
        from {
            transform: translateX(-400%);
        } 95% {
            opacity: 0;
        } to {
            transform: translateX(0) rotate(540deg);
            opacity: 0;
        }
    }
</style>

<div class="upcoming-event">
    <div class="session">
        <div class="head">
            <span class="name">{upcomingEvent.eventName}</span>
        </div>
    </div>
    <div class="all-sessions">
        {#each { length: upcomingEvent.sessionNames.length } as _, i}
            <div class="session"
                 class:inPast={isSessionInPast(upcomingEvent.sessionsDateTime.at(i), upcomingEvent.sessionNames.at(i), dataConfig)}
                 class:isOngoing={isOngoing(upcomingEvent.sessionsDateTime.at(i), upcomingEvent.sessionNames.at(i))}
            >
                <div class="head">
                    <span class="name">{innerWidth < 1200 ? upcomingEvent.shortSessionNames.at(i) : upcomingEvent.uppercaseSessionNames.at(i)}</span>
                    <span class="checkmark"><i class="fa-solid fa-flag-checkered"></i></span>
                    <span class="car"><i class="fa-duotone fa-tire"></i></span>
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
