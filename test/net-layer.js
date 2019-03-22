'use strict'

const { deepStrictEqual, strictEqual } = require('assert')
const NetLayer = require('../src/models/net-layer')

describe(`NetLayer tests`, () => {

    it(`should create a new instance of the NetLayer with settings for usage of /tmp/local.sock file`, () => {
        const netLayer = new NetLayer(null)
        const path = '/tmp/local.sock'
        strictEqual(netLayer instanceof NetLayer, true)
        deepStrictEqual(netLayer.net, { path })
        deepStrictEqual(netLayer.address, path)
    })

    const host = '192.168.0.1', port = 80

    it(`should create a new instance of the NetLayer with settings for usage of 127.0.0.1:${port} address`, () => {
        const netLayer = new NetLayer(null, { net: { port } })
        deepStrictEqual(netLayer.net, { host: '127.0.0.1', port })
        deepStrictEqual(netLayer.address, `127.0.0.1:${port}`)
    })

    it(`should create a new instance of the NetLayer with settings for usage of ${host}:${port} address`, () => {
        const netLayer = new NetLayer(null, { net: { host, port } })
        deepStrictEqual(netLayer.net, { host, port })
        deepStrictEqual(netLayer.address, `${host}:${port}`)
    })
})
