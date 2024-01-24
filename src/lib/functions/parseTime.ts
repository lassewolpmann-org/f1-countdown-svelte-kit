import type {DataConfig} from "$lib/types/RaceData";

export const parseTime = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const parseEndTimes = (sessions: {[key: string]: string}, dataConfig: DataConfig) => {
    const endDates: {[key: string]: string} = {};

    Object.keys(sessions).forEach(key => {
        const date = sessions[key];
        if (!date) return

        const timestamp = new Date(date).getTime();
        const sessionLength = dataConfig.sessionLengths[key];

        if (!sessionLength) return

        const endTimestamp = timestamp + (sessionLength * 60 * 1000);
        endDates[key] = new Date(endTimestamp).toString()
    })

    return Object.values(endDates).map(parseTime)
}