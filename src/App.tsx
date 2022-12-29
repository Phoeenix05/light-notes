import { open } from '@tauri-apps/api/dialog'
import { readDir } from '@tauri-apps/api/fs'
import { createEffect, createResource } from 'solid-js'
import FileItem from './components/FileItem'

const getFiles = async () => {
	const path = await open({
		directory: true,
		multiple: false
	})
	
	const files = await readDir(String(path), { recursive: true })

	return files
}

function App() {
	const [files, { refetch }] = createResource(getFiles)

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
		<div data-tauri-drag-region class='w-screen h-screen bg-neutral-900'>
			{ files()?.map((file) => <FileItem name={file.name} path={file.path} />) }
		</div>
	)
}

export default App
