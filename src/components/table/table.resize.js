import { $ } from '@core/dom'
export function resizeHandler($root, e) {
	const $resizer = $(e.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	const type = $resizer.data.resize
	const sideProp = type === 'col' ? 'right' : 'bottom'
	let value
	document.onmousemove = (event) => {
		if (type === 'col') {
			const delta = event.pageX - coords.right
			value = coords.width + delta
			$resizer.css({ [sideProp]: `-${delta}px` })
		} else {
			const delta = event.pageY - coords.bottom
			value = coords.height + delta
			$resizer.css({ [sideProp]: `-${delta}px` })
		}
	}
	document.onmouseup = (event) => {
		document.onmousemove = null
		document.onmouseup = null
		if (type === 'col') {
			$parent.css({ width: `${value}px` })
			$root
				.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach((c) => (c.style.width = `${value}px`))
			$resizer.css({ right: 0 })
		} else {
			$parent.css({ height: `${value}px` })
			$resizer.css({ bottom: 0 })
		}
	}
}
