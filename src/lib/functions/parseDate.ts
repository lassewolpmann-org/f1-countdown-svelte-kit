export const parseDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        weekday: 'short'
    })
}