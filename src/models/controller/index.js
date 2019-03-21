'use strict'

const Root = require('../root')

class Controller extends Root {

    constructor (parent, debugOn = false) {
        super(parent)
        this.debugOn = Boolean(debugOn)
    }
}

module.exports = Controller
