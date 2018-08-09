import * as Axios from 'axios';

export abstract class AbstractVrcApi {
    abstract init(): Promise<void>;
    abstract fetchUserByName(username: string): Promise<any>;
}

export class VrcApi implements AbstractVrcApi {
    static BASE_URL = 'https://api.vrchat.cloud/api/1/';

    private _apiKey: string = '';

    constructor(private _username: string, private _password: string) {}

    init() {
        return Axios.default.get(VrcApi.BASE_URL + 'config')
            .then((res) => {
                this._apiKey = res.data.clientApiKey;
            })
            .catch(() => {
                throw Error('cannot get api key.');
            });
    }

    fetchUserByName(username: string) {
        const url = `${VrcApi.BASE_URL}users/${username}/name?apiKey=${this._apiKey}`;
        
        return Axios.default.get(url, {
            auth: {
                username: this._username,
                password: this._password,
            },
        }).then((res) => {
            return res.data;
        }).catch(() => {
            throw Error('cannot get user data');
        });
    }
}

export class VrcApiMock implements AbstractVrcApi {
    constructor() {}

    init () {
        return Promise.resolve();
    }

    fetchUserByName(username: string) {
        return Promise.resolve(username) // usernameを使ってないことにより発生するエラーを抑止するために、ここで適当に使っておく
            .then(() => {
                return { id: 'usr_d0d44753-45d6-4c8e-b7de-ba9c53cb31a1',
                username: 'nekomasu',
                displayName: 'Nekomasu',
                currentAvatarImageUrl: 'https://api.vrchat.cloud/api/1/file/file_730d958c-0827-4338-adad-abc737df6d37/3/file',
                currentAvatarThumbnailImageUrl: 'https://d348imysud55la.cloudfront.net/thumbnails/4077637398.thumbnail-500.png',
                developerType: 'none',
                tags:
                 [ 'system_avatar_access',
                   'system_world_access',
                   'system_legend',
                   'admin_avatar_access',
                   'admin_world_access',
                   'system_trust_basic',
                   'system_trust_intermediate',
                   'system_feedback_access' ],
                status: 'active',
                statusDescription: '' }
            });
    }
}
