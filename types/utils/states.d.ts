export default interface IStates {
    readonly: boolean;
    currentSelections: Array<number[]>;
}
export default class States {
    static getStates(states: IStates): IStates;
}
