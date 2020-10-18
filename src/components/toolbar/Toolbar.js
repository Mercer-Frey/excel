import { $ } from '@core/dom'
import { createToolbar } from './toolbar.template'
import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { DEFAULT_STYLES_CELL } from '@/constans'

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar'
	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
			...options,
		})
	}
	prepare() {
		this.initState(DEFAULT_STYLES_CELL)
	}
	get template() {
		return createToolbar(this.state)
	}
	toHTML() {
		return this.template
	}
	onClick(event) {
		const $target = $(event.target)
		if ($target.data.type === 'button') {
			const value = JSON.parse($target.data.value)
			this.$emit('toolbar:applyStyle', value)
		}
	}
	storeChanged(changes) {
		console.log('changes', changes.currentStyles)
		this.setState(changes.currentStyles)
	}
}
