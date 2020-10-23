import { Router } from './Router'
import { Page } from '../page/Page'
import { DEFAULT_TIME_LOADER } from '../../constans'

class DashboardPage extends Page {
	getRoot() {
		const root = document.createElement('div')
		root.innerHTML = 'dashboard'
		return root
	}
}
class ExcelPage extends Page {}
describe('Router:', () => {
	let router
	let $root

	beforeEach(() => {
		$root = document.createElement('div')
		router = new Router($root, {
			dashboard: DashboardPage,
			excel: ExcelPage,
		})
	})
	test('should be defined', () => {
		expect(router).toBeDefined()
	})
	test('should render Dashboard Page', () => {
		return new Promise((resolve) => {
			router.changePageHandler()
			setTimeout(() => {
				expect($root.innerHTML).toBe('<div>dashboard</div>')
				resolve()
			}, DEFAULT_TIME_LOADER)
		})
	})
})
