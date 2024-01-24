export const parseName = (name: string): string => {
    if (name.includes("Grand Prix") || name.includes("TESTING")) {
        return name
    } else {
        return name + " Grand Prix"
    }
}