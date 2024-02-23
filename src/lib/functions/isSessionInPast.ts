import type { DataConfig } from "$lib/types/RaceData";

export const isSessionInPast = (sessionDate: string | undefined, sessionName: string | undefined, dataConfig: DataConfig): boolean => {
    if (!sessionDate) return false
    if (!sessionName) return false

    const currentTimestamp = new Date().getTime();
    const sessionDuration = dataConfig.sessionLengths[sessionName];

    if (!sessionDuration) return false
    const sessionEndTimestamp = new Date(sessionDate).getTime() + (sessionDuration * 60 * 1000);

    return sessionEndTimestamp <= currentTimestamp
}