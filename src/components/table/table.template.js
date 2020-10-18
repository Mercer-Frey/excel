import {
	CHAR_CODES_COLUMN,
	DEFAULT_STYLES_CELL,
	DEFAULT_WIDTH_CELL,
	DEFAULT_HEIGHT_CELL,
} from '@/constans'
import { toInlineStyles } from '@core/utils'
import { parse } from '@core/parse'
function getWidth(state, index) {
	return `${state[index] || DEFAULT_WIDTH_CELL}px`
}
function getHeight(state, index) {
	return `${state[index] || DEFAULT_HEIGHT_CELL}px`
}
function widthFrom(state) {
	return function (col, index) {
		return {
			col,
			index,
			width: getWidth(state, index),
		}
	}
}
function toCell(state, row) {
	return (_, col) => {
		const width = getWidth(state.colState, col)
		const id = `${row}:${col}`
		const data = state.dataState[id] || ''
		const styles = toInlineStyles({
			...DEFAULT_STYLES_CELL,
			...state.stylesState[id],
		})
		return `
			<div class="cell" contenteditable 
			data-col="${col}" 
			data-type="cell"
			data-value="${data || ''}"
			data-id="${id}"
			style="${styles}; width: ${width}">
			${parse(data || '')}
			</div>
		`
	}
}
function toColumn({ col, index, width }) {
	return `
		<div class="column" 
		data-type="resizable" 
		data-col="${index}" 
		style="width: ${width}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
    `
}
function createRow(index, content, state) {
	const resize = index
		? '<div class="row-resize" data-resize="row" ></div>'
		: ''
	const height = getHeight(state, index)
	return `
		<div 
			class="row" 
			data-type="resizable" 
			data-row="${index}" 
			style="height: ${height};" >
				<div class="row-info">
					${index ? index : ''}
					${resize}
				</div>
				<div class="row-data">${content}</div>
        </div>
    `
}
function toChar(_, i) {
	return String.fromCharCode(CHAR_CODES_COLUMN.A + i)
}

export function createTable(rowsCount = 15, state = {}) {
	const colsCount = CHAR_CODES_COLUMN.Z - CHAR_CODES_COLUMN.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(widthFrom(state.colState))
		.map(toColumn)
		.join('')

	rows.push(createRow(null, cols, {}))

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount).fill('').map(toCell(state, row)).join('')
		rows.push(createRow(row + 1, cells, state.rowState))
	}

	return rows.join('')
}
