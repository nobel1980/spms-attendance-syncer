const utils = require('../src/utils');
var fs = require('fs'); 

describe('utils', () => {
    beforeEach(() => {
    });

    describe('readSyncTime', () => {

        // happy path
        it('should return a number', async () => {
            const result = await utils.readSyncTime();
            console.log(result);
            expect(typeof result).toBe('string');
            expect(result).toBe('2023-05-25 20:18:55 PM');
        });

        // sad path
        it('should return null if there is an error in dateToString', async () => {
            // const fsExistsSync = jest.fn().mockReturnValue(false);
            let spyFs = jest.spyOn(fs, "existsSync").mockImplementation(() => false);
            let spyDt = jest.spyOn(global, "Date").mockImplementation(() => null);
            const result = await utils.readSyncTime();
            expect(result).toBe(null);
            spyFs.mockRestore();
            spyDt.mockRestore();
        });

        it('should return null if there is an error in readFileSync', async () => {
            let spyFs = jest.spyOn(fs, "existsSync").mockImplementation(() => true);
            let spyDt = jest.spyOn(fs, "readFileSync").mockImplementation(() => null);
            const result = await utils.readSyncTime();
            expect(result).toBe(null);
            spyFs.mockRestore();
            spyDt.mockRestore();
        });
    });

    describe('writeSyncTime', () => {
        // happy path
        it('should return a number', async () => {
            const result = await utils.writeSyncTime('2023-05-25 20:18:55 PM');
            expect(typeof result).toBe('string');
            expect(result).toBe('2023-05-25 20:18:55 PM');
        });

        // sad path
        it('should return null if datestring is null', async () => {
            await expect(utils.writeSyncTime(null)).rejects.toThrow('Datestring is null');
        });

        it('should return null if there is an error in dateToString', async () => {
            let spy = jest.spyOn(fs, "writeFile").mockImplementation((f, d, callback) => setTimeout(() => { callback('some error') }));
            await expect(utils.writeSyncTime('2023-05-25 20:18:55 PM')).rejects.toThrow("Error writing to file");
            spy.mockRestore();
        });
    });

    describe('dateToString', () => {
        // happy path
        it('should return a string', () => {
            const result = utils.dateToString(new Date());
            console.log("dateToString::", result);
            expect(typeof result).toBe('string');
        });

        // sad path
        it('should return null if there is an error', () => {
            const result = utils.dateToString(null);
            expect(result).toBe(null);
        });
    });

    describe('getTodayEndDatetime', () => {

        // happy path
        it('should return a string', () => {
            const result = utils.getTodayEndDatetime();
            expect(typeof result).toBe('string');
        });

        // sad path
        it('should return null if there is an error', () => {
            let spy = jest.spyOn(global, "Date").mockImplementation(() => null);
            const result = utils.getTodayEndDatetime();
            expect(result).toBe(null);
            spy.mockRestore();
        });
    });
});