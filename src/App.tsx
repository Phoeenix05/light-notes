import { open } from '@tauri-apps/api/dialog'
import { createEffect, createResource } from 'solid-js'

const getPath = async () => {
	const path = await open({
		directory: true,
		multiple: false
	})

	return path
}

function App() {
	const [path, { refetch }] = createResource(getPath)

	createEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'o' && (e.metaKey || e.ctrlKey)) {
				refetch()
			}
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
	})
	
	return (
		<div data-tauri-drag-region id='window' class='w-screen h-screen bg-neutral-800/80'>
			<h1>{ path() }</h1>
		</div>
	)
}

export default App
