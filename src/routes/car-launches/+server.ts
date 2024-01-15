import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { CarLaunch } from "$lib/types/CarLaunch";

export const GET: RequestHandler = () => {
    // Source: https://www.formula1.com/en/latest/article.f1-2024-new-car-launch-dates-season.2VOQ3Ho1HCp28sYK0KDnof.html

    const launchDates: CarLaunch[] = [
        {team_name: "Williams", location: "New York", tbc: false, date: "2024-02-05T12:00:00Z", announcement: "https://www.instagram.com/p/C1uPv5ZILAY/"},
        {team_name: "Stake F1 Team", location: "London", tbc: false, date: "2024-02-05T12:00:00Z", announcement: "https://www.instagram.com/p/C1juv7VNj6F/"},
        {team_name: "Aston Martin", location: "Silverstone", tbc: false, date: "2024-02-12T12:00:00Z", announcement: "https://www.instagram.com/p/C1rQaj3MJ1O/"},
        {team_name: "Ferrari", location: "TBC", tbc: false, date: "2024-02-13T12:00:00Z", announcement: "https://www.instagram.com/p/C1AFL2VqvoN/"},
        {team_name: "Red Bull", location: "TBC", tbc: true, date: "", announcement: ""},
        {team_name: "Mercedes", location: "TBC", tbc: false, date: "2024-02-14T12:00:00Z", announcement: "https://www.instagram.com/p/C2HXajQtJV-/"},
        {team_name: "McLaren", location: "TBC", tbc: true, date: "", announcement: ""},
        {team_name: "Alpine", location: "TBC", tbc: true, date: "", announcement: ""},
        {team_name: "AlphaTauri", location: "TBC", tbc: true, date: "", announcement: ""},
        {team_name: "Haas", location: "TBC", tbc: true, date: "", announcement: ""}
    ]

    // Sort by ascending date
    launchDates.sort((a, b) => {
        const aDate = a.date;
        const bDate = b.date;

        if (aDate && bDate) {
            return aDate < bDate ? -1 : 1
        } else {
            return 1
        }
    })

    const filteredLaunches = launchDates.filter((launch: CarLaunch): boolean => {
        const launchTimestamp = new Date(launch.date).getTime();
        const currentTimestamp = new Date().getTime();

        return currentTimestamp < launchTimestamp
    })

    return json(filteredLaunches);
};