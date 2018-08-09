import { NotDI } from '../src/not_di';

describe('NotDI', () => {
    test('Get User ID', () => {
        const notDI = new NotDI();
        return notDI.fetchUserId('nekomasu')
            .then((id) => {
                expect(id).toBe('usr_d0d44753-45d6-4c8e-b7de-ba9c53cb31a1');
            });
    });
});
