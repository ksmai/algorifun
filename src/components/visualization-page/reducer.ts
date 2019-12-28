import State from 'components/visualization-page/state';
import { Action } from 'components/visualization-page/actions';

export default (state: State, action: Action): State => {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                data: action.payload.data,
            };
        case 'SPEEDUP':
            return {
                ...state,
                speed: action.payload.speed,
            }
        case 'PAUSE':
            return { ...state, paused: true };
        case 'PLAY':
            return { ...state, paused: false };
        default:
            return state;
    }
};
