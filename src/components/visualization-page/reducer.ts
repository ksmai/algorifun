import State from 'components/visualization-page/state';
import { Action } from 'components/visualization-page/actions';

export default (state: State, action: Action) => {
    switch (action.type) {
        case 'INPUT':
            const { value } = action.payload;
            return { ...state, value };
        case 'UPDATE':
            const data = JSON.parse(state.value);
            return {
                ...state,
                data,
                input: JSON.stringify(data, null, 4),
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
