export interface InputAction {
    type: 'INPUT';
    payload: { value: string };
}

export interface UpdateAction {
    type: 'UPDATE';
}

export interface SpeedupAction {
    type: 'SPEEDUP';
    payload: { speed: number };
}

export interface PauseAction {
    type: 'PAUSE';
}

export interface PlayAction {
    type: 'PLAY';
}

export type Action = InputAction | UpdateAction | SpeedupAction | PauseAction | PlayAction;

export const input = (value: string): InputAction => ({
    type: 'INPUT',
    payload: { value },
});

export const update = (): UpdateAction => ({ type: 'UPDATE' });

export const speedup = (speed: number): SpeedupAction => ({
    type: 'SPEEDUP',
    payload: { speed },
});

export const pause = (): PauseAction => ({ type: 'PAUSE' });

export const play = (): PlayAction => ({ type: 'PLAY' });
