export const parseName = (name: string, flag: string | undefined): string => {
    if (name.includes("Grand Prix") || name.includes("TESTING")) {
        return `${flag} ${name}`
    } else {
        return `${flag} ${name} Grand Prix`
    }
}