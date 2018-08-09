import { AbstractVrcApi } from './vrcapi';

export class DI {
    constructor(private _api: AbstractVrcApi) {}

    async fetchUserId(username: string) {
        await this._api.init();
        const userData =  await this._api.fetchUserByName(username);
        return userData.id;
    }
}
