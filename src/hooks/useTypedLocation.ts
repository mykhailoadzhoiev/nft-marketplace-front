import { useHistory, useLocation } from 'react-router-dom'

type LocationState = { search?: string; page?: number; pageYOffset?: number }

export function useTypedLocation() {
    const location = useLocation<LocationState | undefined>()
    const history = useHistory<LocationState | undefined>()
    function set<T extends keyof LocationState>(
        key: T,
        value: LocationState[T]
    ) {
        history.push(location.pathname, { ...location.state, [key]: value })
    }
    return {
        location,
        history,
        setPageState(page: number) {
            set('page', page)
        },
        setPageYOffset() {
            set('pageYOffset', window.scrollY)
        },
    }
}
