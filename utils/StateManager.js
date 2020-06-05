class StateManager {
    static updateStateProperty(context, property, value) {
        let newState = context.state;
        newState[property] = value;
        context.setState(newState);
    }

    static updateStateProperties(context, ...properties) {
        let newState = context.state;
        for (let i = 0; i < properties.length; i++)
            newState[properties[i].name] = properties[i].value;
        context.setState(newState);
    }
}

export default StateManager;