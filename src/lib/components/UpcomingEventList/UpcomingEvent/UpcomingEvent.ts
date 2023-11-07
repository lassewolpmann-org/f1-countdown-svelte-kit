import type { Event } from "$lib/types/Data"

export class UpcomingEvent {
    event: Event
    eventName: string;

    sessionNames: string[];

    sessionsHidden: boolean;

    sessionsDateTime: string[];
    sessionDates: (string | undefined)[];
    sessionTimes: (string | undefined)[];

    raceDate: string | undefined;
    raceTime: string | undefined;

    constructor(event: Event) {
        this.event = event;
        this.eventName = this.parseName(this.event.name);

        this.sessionNames = Object.keys(this.event.sessions).map((eventName) => eventName.toUpperCase());

        this.sessionsHidden = true;

        this.sessionsDateTime = Object.values(this.event.sessions);
        this.sessionDates = this.sessionsDateTime.map(this.parseDate);
        this.sessionTimes = this.sessionsDateTime.map(this.parseTime);

        this.raceDate = this.sessionDates.at(-1);
        this.raceTime = this.sessionTimes.at(-1);
    }

    parseName = (name: string) => {
        if (name.includes("Grand Prix")) {
            return name
        } else {
            return name + " Grand Prix"
        }
    }

    parseDate = (sessionDate: string) => {
        return new Date(sessionDate).toLocaleString(undefined, {
            day: '2-digit',
            month: 'long',
            weekday: 'long'
        })
    }

    parseTime = (sessionDate: string) => {
        return new Date(sessionDate).toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}