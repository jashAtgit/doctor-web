// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [

    //get doctor info using doc_id
    rest.get('/doctors/:doc_id', (req, res, ctx) => {

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
    rest.get('/doctors/:doc_id/patients', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([ 1,2
                // {   
                //     patient_id: 1,
                //     fname: 'Durga',
                //     lname: 'Parasad Reddy',
                //     age: 30,
                //     sex: 'Male',
                // },
                // {
                //     patient_id: 2,
                //     fname: 'Himanshu',
                //     lname: 'Disgrace',
                //     age: 16,
                //     sex: 'Male',
                // }
            ])
        )
    }),

    // mood
    rest.get('/patients/:patient_id/mood', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                mood_value: 3
            })
        )
    }),

    //loginDoctor
    rest.post('/doctors/login', (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json({
                token: 'token123'
            })
        )
    }),

    //patient medical history by patient-id
    rest.get('/patients/:patient_id/medical-history', (req, res, ctx) => {

        const {patient_id} = req.params;

        if(patient_id == 1){

            return res(
                ctx.status(200),
                ctx.json({
                patient_id: patient_id,
                height: 180,
                weight: 90,
                is_smoker: false,
                drinks_alcohol: true,
                diseases: ['anxiety', 'diabetes']
                })
            )
        }
        else if(patient_id == 2){
            return res(
                ctx.status(200),
                ctx.json({
                patient_id: patient_id,
                height: 140,
                weight: 10,
                is_smoker: false,
                drinks_alcohol: false,
                diseases: ['tubercolosis', 'hypertension']
                })
            )
        }
        else{
            return res(
                ctx.status(404),
                ctx.json({
                  error: 'Patient not found',
                })
              )
        }



    }),

    //patient demographics by patient-id
    rest.get('/patients/:patient_id/demographics', (req, res, ctx) => {

        const {patient_id} = req.params;

        if(patient_id == 1){
            return res(
                ctx.json({
                    patient_id: patient_id,
                    fname: 'Durga',
                    lname: 'Prasad Reddy',
                    age: 30,
                    sex: 'Male',
                })
              )
        }
        else if(patient_id == 2){
            return res(
                ctx.json({
                  patient_id: patient_id,
                  fname: 'Himanshu',
                  lname: 'Disgrace',
                  age: 16,
                  sex: 'Male',
                })
              )
        }
        else{
            return res(
                ctx.status(404),
                ctx.json({
                  error: 'Patient not found',
                })
              )
        }

    }),


]