<script lang="ts">
    // Function imports
    import { parseName } from "$lib/functions/parseName";
    import { parseDate } from "$lib/functions/parseDate";
    import { parseEndTimes, parseTime } from "$lib/functions/parseTime";
    import { longSessionName } from "$lib/functions/parseSessionName";

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

            this.sessionNames = Object.keys(this.event.sessions).map(longSessionName);
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

    $: upcomingEvent = new UpcomingEvent(event, flags, dataConfig);
</script>

<div class="flex flex-col gap-2">
    <span class="font-semibold text-base lg:text-xl bg-neutral-800 rounded-xl px-5 py-2.5">{flags[event.localeKey]} {event.name}</span>
    <div class="flex flex-row overflow-x-auto gap-2">
        {#each { length: upcomingEvent.sessionNames.length } as _, i}
            <div class="px-5 py-2.5 bg-neutral-800 rounded-xl w-full flex flex-col gap-1">
                <span class="font-semibold w-max">{upcomingEvent.sessionNames.at(i)}</span>
                <Body
                        date={upcomingEvent.sessionDates.at(i)}
                        time={upcomingEvent.sessionTimes.at(i)}
                        endTime={upcomingEvent.sessionEndTimes.at(i)}
                />
            </div>
        {/each}
    </div>
</div>
