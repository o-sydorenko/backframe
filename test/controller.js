'use strict'

const { strictEqual } = require('assert')
const Controller = require('../src/models/controller')

describe(`Controller tests`, () => {
    it(`should create a new instance of Controller`, () => {
        strictEqual(true, new Controller(null) instanceof Controller)
    })
})
