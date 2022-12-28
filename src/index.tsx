/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import './global.css'
import './style.css'

render(() => <App />, document.getElementById('root') as HTMLElement)
