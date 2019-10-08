class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config) {
            this.config = config;
            this.activeState = this.config.initial;
            this.prevState = [];
            this.nextState = [];
            this.states = ['normal', 'busy', 'hungry', 'sleeping'];
            this.events = {};
            for (let key in this.config.states) {
                for (let stateKey in this.config.states[key].transitions) {
                    // if (this.states.includes(this.config.states[key].transitions[stateKey]) === false) {
                    // 	this.states.push(this.config.states[key].transitions[stateKey]);
                    // }
                    if (stateKey in this.events === false) {
                        this.events[stateKey] = [];
                    }
                    this.events[stateKey].push(key);
                }
            }
        } else  {
            throw new Error();
        } 
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }
        
    /**
     * Goes to specified state.
     * @param state
     */
     
    changeState(state) {
        if (this.states.includes(state)) {
            this.prevState.push(this.activeState);
            this.activeState = state;
            this.nextState = [];
            return this.activeState;
        } else {
            throw new Error;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.config.states[this.activeState].transitions) {
            this.prevState.push(this.activeState);
            this.activeState = this.config.states[this.activeState].transitions[event];
            this.nextState = [];
        } else {
            throw new Error;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event) {
            return this.states;
        } else if (Object.keys(this.events).includes(event)) {
            return this.events[event];
        } else {
            return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.prevState.length !== 0) {
            this.nextState.push(this.activeState);
            this.activeState = this.prevState[this.prevState.length - 1];
            this.prevState.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState.length !== 0) {
            this.prevState.push(this.activeState);
            this.activeState = this.nextState[this.nextState.length - 1];
            this.nextState.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = [];
        this.nextState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
