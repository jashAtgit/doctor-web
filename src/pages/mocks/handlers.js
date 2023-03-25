// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3000/doctor*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                user_id: 2,
                fname: 'Mishra',
                lname: 'ji',
            })
        )
    }),


    rest.get('http://localhost:3000/patients*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {   
                    patient_id: 1,
                    fname: 'Durga',
                    lname: 'Parasad',
                    age: 30,
                    sex: 'Male',
                },
                {
                    patient_id: 2,
                    fname: 'Himanshu',
                    lname: 'Disgrace',
                    age: 16,
                    sex: 'Male',
                }
            ])
        )
    }),


]