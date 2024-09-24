<script lang="ts">
    // Function imports
    import { parseName } from "$lib/functions/parseName";
    import { parseDate } from "$lib/functions/parseDate";
    import { parseEndTimes, parseTime } from "$lib/functions/parseTime";

    class UpcomingEvent {
        event: RaceData
        eventName: string;

        sessionNames: string[];

        sessionsHidden: boolean;

        sessionsDateTime: string[];
        sessionDates: (string | undefined)[];
        sessionTimes: (string | undefined)[];

        sessionEndTimes: (string | undefined)[];

        flag: string | undefined;

        constructor(event: RaceData, flags: {[key: string]: string}, dataConfig: DataConfig) {
            this.event = event;
            this.flag = flags[this.event.localeKey];

            this.eventName = parseName(this.event.name, this.flag);

            this.sessionNames = Object.keys(this.event.sessions).map(name => name.toUpperCase());
            this.sessionsHidden = true;

            this.sessionsDateTime = Object.values(this.event.sessions);
            this.sessionDates = this.sessionsDateTime.map(parseDate);
            this.sessionTimes = this.sessionsDateTime.map(parseTime);

            this.sessionEndTimes = parseEndTimes(this.event.sessions, dataConfig);
        }
    }

    // Type imports
    import type {DataConfig, RaceData} from "$lib/types/RaceData";

    // Component imports
    import Body from "$lib/components/UpcomingEventList/UpcomingEvent/SessionBody.svelte";

    export let event: RaceData, flags: {[key: string]: string}, dataConfig: DataConfig;

    let innerWidth = 0;
    const upcomingEvent = new UpcomingEvent(event, flags, dataConfig);
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
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

    .all-sessions {
        display: flex;
        flex-direction: row;
        gap: 5px;

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

    @media only screen and (max-width: 1024px) {
        .all-sessions {
            flex-direction: column;
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
            <div class="session">
                <div class="head">
                    <span class="name">{upcomingEvent.sessionNames.at(i)}</span>
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
