'use strict'

const { strictEqual } = require('assert')
const Root = require('../src/models/root')

describe(`Root tests`, () => {

    it(`should deny creation of new Root instance with invalid parent argument`, () => {
        let error
        try {
            new Root()
        } catch (e) { error = e }

        strictEqual(error.message, `argument "parent" must be an instance of Root or null`)
    })

    it(`should create a new instance of Root`, () => {
        const root = new Root(null)
        strictEqual(true, root instanceof Root)
        strictEqual(false, root.debugOn)
    })
})
