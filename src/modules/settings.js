import { defaultsDeep } from 'lodash';

let settings = require('../settings/default.js');
try {
    let local = require('../settings/local.js');
    settings = defaultsDeep(local, settings);
}
catch (e) {
    console.log({ settingsError: e });
}

export default settings;