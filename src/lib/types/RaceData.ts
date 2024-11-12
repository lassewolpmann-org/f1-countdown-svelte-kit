export interface PrettySession {
    startDate: Date
    endDate: Date
    startDateISO: string
    endDateISO: string
    startDateLocaleString: string
    endDateLocaleString: string
    startTimeLocaleString: string
    endTimeLocaleString: string
    shortName: string
    longName: string
}

export interface RaceData {
    name: string
    location: string
    latitude: number
    longitude: number
    round: number
    slug: string
    localeKey: string
    tbc: boolean
    sessions: { [key: string]: string }
    flag: string
    prettySessions: PrettySession[]
}

export interface DataConfig {
    availableYears: [number]
    sessions: [string]
    sessionLengths: { [key: string]: number}
}