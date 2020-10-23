import { $ } from '../core/dom'

export class Loader {
	constructor() {
		return $.create('div', 'loader').html(`
		<div class="lds-ripple">
		<div>
		</div><div>
		</div>
		</div>
		`)
	}
}
