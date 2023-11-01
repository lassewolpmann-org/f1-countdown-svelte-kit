import type { Actions } from './$types';
import postgres from 'postgres'
import { Stream } from 'node:stream';

import { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } from '$env/static/private';

export const actions = {
    default: async ({ request }) => {
        const sql = postgres({
            host: POSTGRES_HOST,
            port: +POSTGRES_PORT,
            database: POSTGRES_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD
        })

        try {
            const data: FormData = await request.formData();

            const recommend = data.get('recommend') === 'yes';
            const feedback = data.get('feedback');

            if (feedback) {
                const res = await sql`
                insert into feedback (
                    recommend, feedback
                ) values (
                    ${ recommend }, ${ feedback.toString() }
                )
                
                returning *
                `

                console.log(res)
            }
        } catch (e) {
            console.log(e);
        }
    }
} satisfies Actions;