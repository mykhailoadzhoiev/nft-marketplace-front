import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Router } from './router/Router'
import { action_authFetch } from './store/actions/auth'
import { Loader } from './components/Loader'
import { Header } from './components/Header'
import { PopupOnboard } from './hoc/Popup'

const Application = () => {
    return (
        <div className="wrapper">
            <Header></Header>
            <div className="main container">
                <Router></Router>
            </div>
            <PopupOnboard></PopupOnboard>
        </div>
    )
}

export function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const init = useCallback(async () => {
        await dispatch(action_authFetch())
        setLoading(false)
    }, [dispatch])

    useEffect(() => {
        init()
    }, [init])

    return loading ? <Loader></Loader> : <Application></Application>
}
