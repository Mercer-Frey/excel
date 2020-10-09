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
			const delta = coords.right - event.pageX
			value = coords.width - delta
			$resizer.css({ [sideProp]: `${value >= 40 ? delta : false}px` })
		} else {
			const delta = coords.bottom - event.pageY
			value = coords.height - delta
			$resizer.css({ [sideProp]: `${value >= 20 ? delta : false}px` })
		}
	}
	document.onmouseup = (event) => {
		document.onmousemove = null
		document.onmouseup = null
		if (type === 'col') {
			$parent.css({ width: `${value >= 40 ? value : 40}px` })
			$root
				.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach((c) => (c.style.width = `${value >= 40 ? value : 40}px`))
			$resizer.css({ right: 0 })
		} else {
			$parent.css({ height: `${value >= 20 ? value : 20}px` })
			$resizer.css({ bottom: 0 })
		}
	}
}
