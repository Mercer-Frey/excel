import { TABLE_RESIZE } from './types'

export function rootReducer(state, action) {
	switch (action.type) {
		case TABLE_RESIZE:
			const prevState = state.colState || {}
			prevState[action.data.id] = action.data.value
			console.log('prevState', prevState)
			console.log('state', state)
			return { ...state, colState: prevState }

		default:
			return state
	}
}
