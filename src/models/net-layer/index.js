'use strict'

const Root = require('../root')
const { removeSocketFile } = require('../../../utils')

class NetLayer extends Root {

    constructor (parent, options = {}) {
        super(parent)
        this.net = options.net || {}
    }

    get net () {
        return this._net
    }

    set net (settings) {
        if (typeof settings.port === 'number') {
            return this._net = {
                host: settings.host || '127.0.0.1',
                port: settings.port
            }
        }

        settings.path = settings.path || '/tmp/local.sock'

        removeSocketFile(settings.path)
        return this._net = {
            path: settings.path
        }
    }
}

module.exports = NetLayer

