import { createStore } from 'redux'
import rootReducer from '../reducers'

/*
 createStore接受 Reducer 作为参数，生成一个新的 Store。
 以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
 */
export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    return store
}
