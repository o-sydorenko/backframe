'use strict'

const fs = require('fs')

module.exports = {
    deserializeAuthentication,
    removeSocketFile,
    serializeAuthentication
}

/**
 * @function deserializeAuthentication
 * @description deserialize authentication data between client and server side of a socket
 * @param {object} buf
 * @returns {object} - array [type, password]
 */

function deserializeAuthentication (buf) {

    if (buf.byteLength === 1) {
        return [buf.readUInt8(0)]
    }

    return [
        buf.readUInt8(0),
        buf.readDoubleLE(1),
        buf.readUInt16LE(9),
        buf.slice(11, buf.byteLength).toString()
    ]
}

/**
 * @description delete the socket file before creating a new one
 * @param {string} path - path to socket file
 * */

function removeSocketFile (path) {
    if (fs.existsSync(path)) {
        if (fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK) === void 0) {
            return fs.unlinkSync(path)
        }

        throw new Error(`you have no rights to read file: ${path}`)
    }
}

/**
 * @function serializeAuthentication
 * @description serialize authentication data between client and server side of a socket
 * @param {number} type - request type, 255 - is authentication
 * @param {number} [socketIpAddress] - IP address of the remote machine the socket connected from
 * @param {number} [socketPort] - socket identifier (although it matches with the server port the socket connected to)
 * @param {string} [password] - identification password
 * @returns {object} - buffer
 */

function serializeAuthentication (type = 255, socketIpAddress = 0, socketPort = 0, password = '') {
    const buf = Buffer.alloc(11)
    buf.writeUInt8(type, 0)
    buf.writeDoubleLE(socketIpAddress, 1)
    buf.writeUInt16LE(socketPort, 9)
    return Buffer.concat([buf, Buffer.from(password)])
}