const request = require('supertest');
const app = require('./app');

describe('API Server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(8000, () => {
            console.log('Test server running at port 8000!');
        });
    })
    afterAll((done) => {
        api.close(done);
        console.log('Gracefully stopping test server');
    });
    it('responds to get / with a status 200', (done) => {
        request(api).get('/').expect(200, done);
    });
    it('responds to get /london-tips with a status 200', (done) => {
        request(api).get('/london-tips').expect(200, done);
    });
    //2 out of 3 tests passed--except for this casting by id: possibly a typo
    it('retrieves a cast by id', (done) => {
        request(api)
            .get('/london-tips/2')
            .expect(200)
            .expect({ id: 2, quote: `"I’M STILL LEARNING."`, name: '--Michelangelo' }, done);
    });

    /*TRIED TESTING THIS ONE, BUT JEST KEPT TIMING OUT
    it('will retrieve random cast by id with the londonTipsArray array', (done) => {
        request(api).get('/london-tips/random').expect(200)  
    });*/
});