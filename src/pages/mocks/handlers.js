// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3000/doctor', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                user_id: 2,
                fname: 'Mishra',
                lname: 'ji',
            })
        )
    }),
]