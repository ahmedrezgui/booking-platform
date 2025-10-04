import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { useCookies } from 'react-cookie';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index.js';
import Cookies from 'js-cookie';



let store;
const persistedState = Cookies.get('reduxState');

const persistConfig = {
    key: 'root', // key for local storage
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (persistedState) {
    try {
        store = configureStore({
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
                    },
                }),

            preloadedState: JSON.parse(persistedState),
            reducer: persistedReducer,
        })

    } catch (error) {
        console.error('Error parsing persisted state:', error);
    }
} else {
    store = configureStore({
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['FLUSH', 'persist/REHYDRATE', 'PAUSE', 'persist/PERSIST', 'PURGE', 'REGISTER']
                },
            }),

        preloadedState: {
            wishlist: []
        },
        reducer: persistedReducer,

    })

}

store.subscribe(() => {
    const state = store.getState();
    Cookies.set('reduxState', JSON.stringify(state));
});


const persistor = persistStore(store);

export { store, persistor };