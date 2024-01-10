export const parseTime = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    })
}