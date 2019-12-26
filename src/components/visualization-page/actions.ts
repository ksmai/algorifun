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

export interface PauseAction {
    type: 'pause';
}

export interface PlayAction {
    type: 'play';
}

type Action = InputAction | UpdateAction | SpeedupAction | PauseAction | PlayAction;
export default Action;
