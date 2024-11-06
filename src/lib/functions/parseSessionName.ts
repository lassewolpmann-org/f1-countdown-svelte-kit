export const shortSessionName = (sessionName: string) => {
    switch (sessionName) {
        case "fp1":
            return "FP1"
        case "fp2":
            return "FP2"
        case "fp3":
            return "FP3"
        case "practice":
            return "P"
        case "qualifying":
            return "Q"
        case "qualifying1":
            return "Q1"
        case "qualifying2":
            return "Q2"
        case "sprintQualifying":
            return "SQ"
        case "sprint":
            return "Sprint"
        case "gp":
            return "Race"
        case "feature":
            return "Feature"
        case "race1":
            return "Race 1"
        case "race2":
            return "Race 2"
        case "race3":
            return "Race 3"
        default:
            return "?"
    }
}

export const longSessionName = (sessionName: string) => {
    switch (sessionName) {
        case "fp1":
            return "Free Practice 1"
        case "fp2":
            return "Free Practice 2"
        case "fp3":
            return "Free Practice 3"
        case "practice":
            return "Practice"
        case "qualifying":
            return "Qualifying"
        case "qualifying1":
            return "1st Qualifying"
        case "qualifying2":
            return "2nd Qualifying"
        case "sprintQualifying":
            return "Sprint Qualifying"
        case "sprint":
            return "Sprint"
        case "gp":
            return "Race"
        case "feature":
            return "Feature"
        case "race1":
            return "1st Race"
        case "race2":
            return "2nd Race"
        case "race3":
            return "3rd Race"
        default:
            return "Undefined Session"
    }
}