import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from "react-router-dom";
import rootReducer from './reducers'
import App from './App'
import './index.css'

const store = createStore(rootReducer)

render(
    // the store glues together the states of the entire application
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)
