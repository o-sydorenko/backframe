'use strict'

const EventEmitter = require('events').EventEmitter

class Root extends EventEmitter {

    constructor (parent, debugOn) {
        super()
        this.debugOn = Boolean(debugOn)

        if (!Root.validateParent(parent)) {
            throw new TypeError(`argument "parent" must be an instance of Root or null`)
        }

        this.parent = parent
        // this.parent = parent === null ? this : parent // think todo

        // STATE CHANGE EVENTS
        // ready            - once after establish all connections and ready servers
        // stateChange      - this.isReady = !this.isReady (on isReady change)
        // conditionsChange - one of instances condition has been changed

        this.entities = {}
        this.conditions = {}
        this.isReady = true
        this.wasCalledReadyEvent = false
    }

    static validateParent (parent) {
        return parent === null || parent instanceof Root
    }

    debug (...args) {
        console.log(this.name || '', ...args)
    }

    /**
     * @method checkState
     * @returns {boolean}
     * */

    checkState () {

        for (const entityGroupType in this.conditions) {
            if (this.conditions.hasOwnProperty(entityGroupType)) {
                const targetGroup = this.conditions[entityGroupType]

                for (const entity in targetGroup) {
                    if (targetGroup.hasOwnProperty(entity)) {

                        if (!this.getCondition(entityGroupType, entity)) {

                            // if parent has state === true we need to change it
                            // because one of his child services is not ready
                            if (this.isReady) {
                                this.emit('stateChange', this.isReady = false)
                            }

                            return this.isReady // false
                        }
                    }

                }
            }

        }

        // if parent has isReady === false we need to change it
        // because all of his child services are ready again
        if (!this.isReady) {
            this.emit('stateChange', this.isReady = true)
            if (!this.wasCalledReadyEvent) {
                this.wasCalledReadyEvent = true
                this.emit('ready')
            }
        }

        return this.isReady // true
    }

    /**
     * @method getCondition
     * @description check single services condition
     * @returns {boolean}
     * */

    getCondition (entity, type) {
        if (this.conditions[entity] instanceof Object) {
            return this.conditions[entity][type]
        }

        return false
    }

    /**
     * @method setCondition
     * @description update single services condition
     * @returns {void}
     * */

    setCondition (entity, type, val = false) {
        this.conditions[entity] = this.conditions[entity] || {}

        if (this.conditions[entity][type] !== val) {
            this.conditions[entity][type] = val
            this.emit('conditionsChange', entity, type, val)
            this.checkState()
        }
    }
}

module.exports = Root
