// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [

    //get doctor info using doc_id
    rest.get('http://localhost:3000/doctors/:doc_id', (req, res, ctx) => {

        const {doc_id} = req.params;

        return res(
            ctx.status(200),
            ctx.json({
                user_id: doc_id,
                fname: 'Mishra',
                lname: 'ji',
            })
        )
    }),

    //get patients assigned to a docter with doc_id
    rest.get('http://localhost:3000/doctors/:doc_id/patients', (req, res, ctx) => {
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

    // mood
    rest.get('http://localhost:3000/patients/:patient_id/mood', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                mood_value: 3
            })
        )
    }),

    //loginDoctor
    rest.post('http://localhost:3000/doctors/login', (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json({
                token: 'token123'
            })
        )
    }),


]