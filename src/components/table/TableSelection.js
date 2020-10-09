import { Dom } from '@core/dom'
export class TableSelection {
	static className = 'selected'
	constructor() {
		this.group = []
		this.current = null
	}
	select($el) {
		if ($el instanceof Dom) {
			this.clear()
			this.group.push($el)
			this.current = $el
			$el.focus().addClass(TableSelection.className)
		} else {
			throw new Error(
				`Select isn't allowed because of ${$el} is not an instance of class Dom`
			)
		}
	}
	selectGroup($group) {
		this.clear()
		this.group = $group
		this.group.forEach(($el) => $el.addClass(TableSelection.className))
	}
	clear() {
		this.group.forEach(($el) => $el.removeClass(TableSelection.className))
	}
}
