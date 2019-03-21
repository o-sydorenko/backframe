'use strict'

const { strictEqual } = require('assert')
const Controller = require('../src/models/controller')

describe(`Controller tests`, () => {
    it(`should create a new instance of Controller`, () => {
        const ctrl = new Controller(null)
        strictEqual(true, ctrl instanceof Controller)
        strictEqual(false, ctrl.debugOn)
    })
})
