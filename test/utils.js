'use strict'

const { deepStrictEqual, strictEqual } = require('assert')
const { deserializeAuthentication, serializeAuthentication } = require('../utils')

describe(`utils tests`, () => {

    describe(`serializeAuthentication tests`, () => {
        it(`should return buffer 11 bytes length`, () => {
            strictEqual(11, serializeAuthentication(255).byteLength)
            strictEqual(19, serializeAuthentication(255, 17263712637, 65535, 'password').byteLength)
        })
    })

    describe(`deserializeAuthentication tests`, () => {
        it(`should correctly deserialize data`, () => {
            deepStrictEqual([255, 0, 0, ''], deserializeAuthentication(
                serializeAuthentication(255)
            ))

            deepStrictEqual([255, 17263712637, 65535, 'password'], deserializeAuthentication(
                serializeAuthentication(255, 17263712637, 65535, 'password')
            ))
        })
    })
})