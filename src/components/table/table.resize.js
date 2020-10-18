import { $ } from '@core/dom'
import { MIN_HEIGHT_CELL, MIN_WIDTH_CELL } from '@/constans'
export function resizeHandler($root, e) {
	return new Promise((resolve) => {
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
				$resizer.css({
					[sideProp]: `${value >= MIN_WIDTH_CELL ? delta : false}px`,
				})
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
				value = value >= MIN_WIDTH_CELL ? value : MIN_WIDTH_CELL
				$parent.css({
					width: `${value}px`,
				})
				$root
					.findAll(`[data-col="${$parent.data.col}"]`)
					.forEach((c) => (c.style.width = `${value}px`))
				$resizer.css({ right: 0 })
			} else {
				value = value >= MIN_HEIGHT_CELL ? value : MIN_HEIGHT_CELL
				$parent.css({
					height: `${value}px`,
				})
				$resizer.css({ bottom: 0 })
			}
			resolve({
				value,
				type,
				id: $parent.data[type],
			})
		}
	})
}
