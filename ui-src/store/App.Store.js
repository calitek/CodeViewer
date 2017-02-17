import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import startWs, {wsMiddleware} from './api/api.ws';
import startIpc, {ipcMiddleware} from './api/api.ipc';

import fileState from './file/file.Reducer';
import treeState from './tree/tree.Reducer';

const reducer = combineReducers({fileState, treeState});
let middleware = [thunkMiddleware];

const api = 1; //run in node-1 run in electron-2
if (api === 1) middleware.push(wsMiddleware);
else middleware.push(ipcMiddleware);

const useLogger = 0;
const loggerMiddleware = createLogger();
if (useLogger) middleware.push(loggerMiddleware);

const store = createStore(reducer, applyMiddleware(...middleware));

if (api === 1) startWs(store);
else startIpc(store);

store.dispatch({type: 'ApiGetTreeData'});

export default store;
