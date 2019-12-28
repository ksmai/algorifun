export interface UpdateAction {
    type: 'UPDATE';
    payload: { data: any };
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

export type Action = UpdateAction | SpeedupAction | PauseAction | PlayAction;

export const update = (data: any): UpdateAction => ({
    type: 'UPDATE',
    payload: { data },
});

export const speedup = (speed: number): SpeedupAction => ({
    type: 'SPEEDUP',
    payload: { speed },
});

export const pause = (): PauseAction => ({ type: 'PAUSE' });

export const play = (): PlayAction => ({ type: 'PLAY' });
