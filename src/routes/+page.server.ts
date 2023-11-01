import type { Actions } from './$types';
import pg from 'pg'
import { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } from '$env/static/private';

export const actions = {
    default: async ({ request }) => {
        const client = new pg.Client({
            host: POSTGRES_HOST,
            port: +POSTGRES_PORT,
            database: POSTGRES_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD
        });

        try {
            await client.connect();

            const data: FormData = await request.formData();

            const recommend = data.get('recommend') === 'yes';
            const feedback = data.get('feedback');

            const text = 'INSERT INTO feedback(recommend, feedback) VALUES ($1, $2) RETURNING *'
            const values = [recommend, feedback]

            const res = await client.query(text, values);

            console.log(res.rows[0])

            await client.end();
        } catch (e) {
            console.log(e);
        }
    }
} satisfies Actions;