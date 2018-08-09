import { VrcApi } from './vrcapi';
import { config } from './data/config';

export class NotDI {
    private _api: VrcApi;

    constructor() {
        this._api = new VrcApi(
            config.username,
            config.password
        );
    }

    async fetchUserId(username: string) {
        await this._api.init();
        const userData =  await this._api.fetchUserByName(username);
        return userData.id;
    }
}
