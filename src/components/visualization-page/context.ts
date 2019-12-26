import React from 'react';

import State from 'components/visualization-page/state';
import { Action } from 'components/visualization-page/actions';

const context: React.Context<[State, React.Dispatch<Action>]> = React.createContext(null);
export default context;
