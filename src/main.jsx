import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ExamXApp } from './ExamXApp'
import { Provider } from 'react-redux'
import './styles.css'
import { store } from './store/store'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ExamXApp />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)