const api = require('../src/api');
const axios = require('axios');

jest.mock('axios');

describe('api', () => {
    describe('login', () => {
        beforeEach(() => {
            
        });

        // happy path
        it('should return a token', async () => {
            axios.post.mockResolvedValue({
                data: {
                    auth_token: 'token'
                }
            });
            const result = await api.login();
            expect(result).not.toBe(null);
            expect(typeof result).toBe('string');
            expect(result).toBe('token');
        });

        // sad path
        it('should return null if there is an error', async () => {
            axios.post.mockRejectedValue({
                error: 'error'
            });
            const result = await api.login();
            expect(result).toBe(null);
        });
    });

    // TODO - write tests for sendData
    describe('sendData', () => {
        beforeEach(() => {
            
        });

        // happy path
        it('should return a response', async () => {
            axios.post.mockResolvedValue({
                data: {
                    message: 'success'
                }
            });
            const result = await api.sendData('token', {});
            expect(result).not.toBe(null);
            expect(typeof result).toBe('object');
            expect(result.data.message).toBe('success');
        });

        // sad path
        it('should return null if there is an error', async () => {
            axios.post.mockRejectedValue({
                error: 'error'
            });
            const result = await api.sendData('token', {});
            expect(result).toBe(null);
        });
    });
});