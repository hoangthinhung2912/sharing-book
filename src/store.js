import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  debug: true,
  stateReconciler: autoMergeLevel2,
  transforms: [
    createBlacklistFilter('auth', ['appState']),
  ]
  // blacklist: ['auth'],
  // whitelist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true
    }) : compose;

const enhancer = (...middleware) => composeEnhancers(
  applyMiddleware(...middleware),
);

const configStore = () => {
  const store = createStore(
    persistedReducer,
    enhancer(thunk),
  )
  const persistor = persistStore(store);
  return { store, persistor }
}

export default configStore;