const { readData } = require('../src/readmdb');

// TODO - write tests with jest mock

describe('readmdb', () => {
    // insert test data
    // beforeAll(() => {
    //     const query = `
    //         INSERT INTO CHECKINOUT (USERID, CHECKTIME)
    //         VALUES (1, '2023-05-23 19:34:29 PM');
    //     `;
    //     connection.execute(query);
    // });

    describe('readData', () => {
        
        it('should return a object', () => {
            const result = readData("2023-05-23 19:34:29 PM");
            expect(typeof result).toBe('object');
        });
    });

    // delete test data
    // afterAll(() => {
    //     const query = `
    //         DELETE FROM CHECKINOUT WHERE USERID = 1;
    //     `;
    //     connection.execute(query);
    // });
});