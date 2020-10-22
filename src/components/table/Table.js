import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { isCell, matrix, nextSelector, shouldResize } from './table.functions'
import { resizeHandler } from './table.resize'
import { TableSelection } from './TableSelection'
import { $ } from '@core/dom'
import { tableResize } from '@/redux/actions'
import { changeText } from '@redux/actions'
import { DEFAULT_STYLES_CELL } from '@/constans'
import { applyStyle, changeStyles } from '@redux/actions'
import { parse } from '@core/parse'

export class Table extends ExcelComponent {
	static className = 'excel__table'
	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		})
	}
	prepare() {
		this.selection = new TableSelection()
	}
	init() {
		super.init()
		this.$on('formula:input', (value) => {
			this.selection.current.attr('data-value', value).text(parse(value))
			this.updateTextInStore(value)
		})
		this.$on('formula:done', () => {
			this.selection.current.focus()
		})
		this.$on('toolbar:applyStyle', (value) => {
			console.log('toolbar:applyStyle', value)
			this.selection.applyStyle(value)
			this.$dispatch(applyStyle({ value, ids: this.selection.selectedIds }))
		})
		this.selectCell(this.$root.find('[data-id="0:0"]'))
	}
	toHTML() {
		return createTable(20, this.store.getState())
	}
	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
		const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES_CELL))
		this.$dispatch(changeStyles(styles))
		console.log('Styles to dispatch', styles)
	}
	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event)
			this.$dispatch(tableResize(data))
		} catch (e) {
			console.warn('resize error', e.message)
		}
	}
	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event)
		} else if (isCell(event)) {
			const $target = $(event.target)
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current).map((id) =>
					this.$root.find(`[data-id="${id}"]`)
				)
				this.selection.selectGroup($cells)
			} else {
				this.selectCell($target)
				if ($target.text().trim() !== '') {
					this.updateTextInStore($target.text())
				}
			}
		}
	}
	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowUp',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
		]
		const { key } = event
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}
	onInput(event) {
		// this.$emit('table:input', $(event.target))
		this.updateTextInStore($(event.target).text())
	}
	updateTextInStore(value) {
		this.$dispatch(
			changeText({
				id: this.selection.current.id(),
				value,
			})
		)
	}
}
