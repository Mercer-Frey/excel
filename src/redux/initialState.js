import { DEFAULT_STYLES_CELL, DEFAULT_TITLE } from '@/constans'
import { clone } from '@core/utils'

const defaultState = {
	title: DEFAULT_TITLE,
	rowState: {},
	colState: {},
	dataState: {},
	stylesState: {},
	currentText: '',
	currentStyles: DEFAULT_STYLES_CELL,
	openedDate: new Date().toJSON(),
}
const normalize = (state) => ({
	...state,
	currentStyles: DEFAULT_STYLES_CELL,
	currentText: '',
})

export function normalizeInitialState(state) {
	return state ? normalize(state) : clone(defaultState)
}
