import { VrcApiMock } from '../src/vrcapi';
import { DI } from '../src/di';

describe('NotDI', () => {
    test('Get User ID', () => {
        const api = new VrcApiMock();
        const notDI = new DI(api);
        return notDI.fetchUserId('nekomasu')
            .then((id) => {
                expect(id).toBe('usr_d0d44753-45d6-4c8e-b7de-ba9c53cb31a1');
            });
    });
});
