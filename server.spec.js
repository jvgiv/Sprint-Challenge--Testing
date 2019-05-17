const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
    describe('get endpoint /games', () => {
        it('should retrieve list of games in json format', async () => {
            let response = await request(server).get('/games')
            console.log(response.headers)
            expect(response.headers["content-type"]).toMatch(/json/i)
        })

        it('should return a 200 ok status', async () => { 
            let response = await request(server).get('/games')

            expect(response.status).toBe(200)
        })

        it('Return empty array when object is blank', async () => {
            let response = await request(server).get('/games')
            console.log(response.body)
            expect(response.body).toStrictEqual([])
        })

     
    })

    describe('Post endpoint /games', () => {
        it('should return a 422 error bc only title and not genre is provided', async () => {
            const body = { title: "Tetris" }

            let response = await request(server)
                                    .post('/games')
                                    .send(body)
            expect(response.status).toBe(422)
        })

        it('should add a user and return a 200 status', async () => {
            const body = { title: "Tetris", genre: "Gameboy" }

            let response = await request(server)
                                .post('/games')
                                .send(body)

            expect(response.status).toBe(200)
            
        })

        it('returns a json when successful', async () => {
            let response = await request(server).get('/games')
            // console.log(response.headers)
            expect(response.headers["content-type"]).toMatch(/json/i)
        })

      
    })
})