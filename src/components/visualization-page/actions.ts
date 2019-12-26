export interface InputAction {
    type: 'input';
    payload: { input: string };
}

export interface UpdateAction {
    type: 'update';
}

export interface SpeedupAction {
    type: 'speedup';
    payload: { speed: number };
}

type Action = InputAction | UpdateAction | SpeedupAction;
export default Action;
