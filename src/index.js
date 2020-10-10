import './scss/index.scss'
import { Excel } from './components/excel/Excel'
import { Table } from './components/table/Table'
import { Formula } from './components/formula/Formula'
import { Header } from './components/header/Header'
import { Toolbar } from './components/toolbar/Toolbar'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { storage } from './core/utils'

const store = createStore(rootReducer, storage('excel-state'))

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store,
})
excel.render()

store.subscribe((state) => {
	storage('excel-state', state)
})
