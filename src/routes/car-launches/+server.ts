import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { CarLaunch } from "$lib/types/CarLaunch";


export const GET: RequestHandler = () => {
    // Source: https://www.formula1.com/en/latest/article.f1-2024-new-car-launch-dates-season.2VOQ3Ho1HCp28sYK0KDnof.html

    const launchDates: CarLaunch[] = [
        {team_name: "Williams", location: "", tbc: false, date: "2024-02-05T12:00:00Z", announcement: "https://www.instagram.com/p/C1uPv5ZILAY/"},
        {team_name: "Stake F1 Team", location: "", tbc: false, date: "2024-02-05T12:00:00Z", announcement: "https://www.instagram.com/p/C1juv7VNj6F/"},
        {team_name: "Aston Martin", location: "", tbc: false, date: "2024-02-12T12:00:00Z", announcement: "https://www.instagram.com/p/C1rQaj3MJ1O/"},
        {team_name: "Ferrari", location: "", tbc: false, date: "2024-02-13T12:00:00Z", announcement: "https://www.instagram.com/p/C1AFL2VqvoN/"},
        {team_name: "Red Bull", location: "", tbc: true, date: "", announcement: ""},
        {team_name: "Mercedes", location: "", tbc: true, date: "", announcement: ""},
        {team_name: "McLaren", location: "", tbc: true, date: "", announcement: ""},
        {team_name: "Alpine", location: "", tbc: true, date: "", announcement: ""},
        {team_name: "AlphaTauri", location: "", tbc: true, date: "", announcement: ""},
        {team_name: "Haas", location: "", tbc: true, date: "", announcement: ""}
    ]

    launchDates.sort((a, b) => {
        const aDate = a.date;
        const bDate = b.date;

        if (aDate && bDate) {
            return aDate < bDate ? -1 : 1
        } else {
            return 1
        }
    })

    return json(launchDates);
};