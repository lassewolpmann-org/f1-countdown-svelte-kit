import type { DataConfig, RaceData } from "$lib/types/RaceData";
import { parseName } from "$lib/functions/parseName";
import { parseDate } from "$lib/functions/parseDate";
import { parseEndTimes, parseTime } from "$lib/functions/parseTime";

export class UpcomingEvent {
    event: RaceData
    eventName: string;

    sessionNames: string[];
    uppercaseSessionNames: string [];

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

        this.sessionNames = Object.keys(this.event.sessions);
        this.uppercaseSessionNames = this.sessionNames.map((sessionName) => sessionName.toUpperCase());

        this.sessionsHidden = true;

        this.sessionsDateTime = Object.values(this.event.sessions);
        this.sessionDates = this.sessionsDateTime.map(parseDate);
        this.sessionTimes = this.sessionsDateTime.map(parseTime);

        this.sessionEndTimes = parseEndTimes(this.event.sessions, dataConfig);
    }
}