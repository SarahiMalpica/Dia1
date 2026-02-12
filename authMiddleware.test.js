const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

describe('authMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    test('should return 401 if no token is provided', () => {
        req.header.mockReturnValue(null);
        
        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ msg: 'No token, authorization denied' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if token is invalid', () => {
        req.header.mockReturnValue('invalid-token');
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
            throw new Error('Invalid token');
        });

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ msg: 'Token is not valid' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should call next() if token is valid', () => {
        const decodedUser = { id: 1, name: 'John' };
        req.header.mockReturnValue('valid-token');
        jest.spyOn(jwt, 'verify').mockReturnValue({ user: decodedUser });

        authMiddleware(req, res, next);

        expect(req.user).toEqual(decodedUser);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
});