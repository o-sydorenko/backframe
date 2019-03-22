'use strict'

const net = require('net')
const NetLayer = require('../net-layer')

class NetServer extends NetLayer {

    constructor (parent, options = {}) {
        super(parent, options)
        this.entityName = options.entityName

        // * * * * * * * * * * * * * * START VERIFICATION SETTINGS
        this.verificationTime = options.verificationTime || 1000
        // * * * * * * * * * * * * * * END VERIFICATION SETTINGS

        this.runEvent = typeof options.runEvent === 'string' ? options.runEvent : null

        this.getNewId = counter()
        this.clients = []
        this.relations = new Map()

    }

    // * * * * * * * * * * * *

    serverFactory () {

        const server = new net.Server()

        server.on('error', (error) => {

        })

        server.on('close', console.error.bind(console, `NetServer closed`))
        server.on('connection', (socket) => {})
        server.on('listening', () => {})

        // return server
        //     .on('connection', (socket) => { this.handleSocket(socket) })
        //     .on('listening', () => {
        //         // this.parent.setCondition('netServers', this.type, this._isReady = true)
        //         // this.debug(`server listening on ${ this.net.port ? `${ this.net.host }:${ this.net.port }` : this.net.path }`)
        //         setImmediate(() => {
        //             if (this.parent.isReady) {
        //                 this.emit('__ready')
        //             }
        //             else {
        //                 this.parent.once('ready', () => this.emit('__ready'))
        //             }
        //         })
        //     })
        //     .on('error', (err) => {
        //         // this.emit('__wait')
        //         // this.parent.setCondition('netServers', this.type, this._isReady = false)
        //         this.close(err)
        //
        //         setTimeout(() => {
        //             this.server = this.createServer()
        //         }, 1000)
        //     })
        //     .on('close', () => { this.debug(`net server closed`) })

    }

    handleSocket () {

    }

    verifySocket () {}

    // * * * * * * * * * * * * UP/DOWN MANIPULATIONS

    down () {}

    up () {}

    // * * * * * * * * * * * * MESSAGE HANDLING

    answer () {}

    broadcast () {}
}

module.exports = NetServer

function counter (i = 1) {
    return function () { return i++ }
}