import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const persistConfig = {
    key: 'key',
    storage,
    blacklist: [],
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