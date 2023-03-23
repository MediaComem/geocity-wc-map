export default interface IStates {
    readonly: boolean;
    currentSelections: Array<number[]>;
}

export default class States {
    static getStates(states: IStates) {
        const result: IStates = {
            readonly: false,
            currentSelections: [],
        }
        if (states) {
            if (states.readonly) result.readonly = states.readonly;
            if (states.currentSelections && states.currentSelections.length > 0) result.currentSelections = states.currentSelections
        }
        return result;
    }
}