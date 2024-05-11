import {legacy_createStore, applyMiddleware, combineReducers} from "redux"
import {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"

const persistConfig = {
    key: "root",
    storage,
    whitelist: [''],//设置持久化
}

const all = combineReducers({
    homeReducer: () => {
        return {}
    }
})

const myPersistReducer = persistReducer(persistConfig, all);

const store = legacy_createStore(myPersistReducer, composeWithDevTools(applyMiddleware(thunk)));

const persist = persistStore(store);

export {store, persist}