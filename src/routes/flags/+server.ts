import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
    const launchDates: {[key: string]: string} = {
        "bahrain-grand-prix": "🇧🇭",
        "saudi-arabia-grand-prix": "🇸🇦",
        "australian-grand-prix": "🇦🇺",
        "japanese-grand-prix": "🇯🇵",
        "chinese-grand-prix": "🇨🇳",
        "miami-grand-prix": "🇺🇸",
        "emilia-romagna-grand-prix": "🇮🇹",
        "monaco-grand-prix": "🇲🇨",
        "canadian-grand-prix": "🇨🇦",
        "spanish-grand-prix": "🇪🇸",
        "austrian-grand-prix": "🇦🇹",
        "british-grand-prix": "🇬🇧",
        "hungarian-grand-prix": "🇭🇺",
        "belgian-grand-prix": "🇧🇪",
        "dutch-grand-prix": "🇳🇱",
        "italian-grand-prix": "🇮🇹",
        "azerbaijan-grand-prix": "🇦🇿",
        "singapore-grand-prix": "🇸🇬",
        "us-grand-prix": "🇺🇸",
        "mexico-grand-prix": "🇲🇽",
        "brazilian-grand-prix": "🇧🇷",
        "las-vegas-grand-prix": "🇺🇸",
        "qatar-grand-prix": "🇶🇦",
        "abu-dhabi-grand-prix": "🇦🇪",
    }

    return json(launchDates);
};