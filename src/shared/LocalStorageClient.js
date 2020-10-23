import { storage } from '@core/utils'
import { DEFAULT_TIME_LOADER } from '@/constans'
export class LocalStorageClient {
	constructor(name) {
		this.name = storageName(name)
	}
	save(state) {
		storage(this.name, state)
		return Promise.resolve()
	}
	get() {
		// return Promise.resolve(storage(this.name))
		return new Promise((resolve) => {
			const state = storage(this.name)
			setTimeout(() => {
				resolve(state)
			}, DEFAULT_TIME_LOADER)
		})
	}
}

function storageName(param) {
	return `excel:${param}`
}
