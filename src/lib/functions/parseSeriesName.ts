export const seriesName = (series: string) => {
    switch (series) {
        case "f1":
            return "FORMULA 1"
        case "f2":
            return "FORMULA 2"
        case "f3":
            return "FORMULA 3"
        case "f1-academy":
            return "F1 ACADEMY"
        default:
            return series
    }
}