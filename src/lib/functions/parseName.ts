export const parseName = (name: string, flag: string | undefined): string => {
    const baseString = `${flag} ${name}`;

    if (name.includes("Grand Prix") || name.includes("TESTING")) {
        return baseString
    } else {
        return `${baseString} Grand Prix`
    }
}