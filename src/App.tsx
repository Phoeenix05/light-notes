import { open } from '@tauri-apps/api/dialog'
import { readDir, readTextFile } from '@tauri-apps/api/fs'
import { createEffect, createResource, createSignal } from 'solid-js'
import FileItem from './components/FileItem'

const getFiles = async () => {
	const path = await open({
		directory: true,
		multiple: false
	})
	
	const files = await readDir(String(path), { recursive: false })

	return files
}

function App() {
	const [files, { refetch }] = createResource(getFiles)
	// const [activeFile, setActiveFile] = createSignal('')
	const [content, setContent] = createSignal('')

	createEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'o' && e.metaKey) {
				refetch()
			}
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
	})
	
	return (
		<div data-tauri-drag-region class='flex w-screen h-screen bg-neutral-900'>
			<section class='flex flex-col min-w-[12rem] h-screen'>
				{
					files()?.map((file) => 
						<FileItem onClick={
							async () => {
								const text = await readTextFile(file.path)
								// setActiveFile(file.path)
								setContent(text)
							}}
							name={file.name} 
							path={file.path} 
						/>) 
				}
			</section>
			<section class='flex-grow'>
				<textarea class='w-full h-full'>
					{ content() }
				</textarea>
			</section>
		</div>
	)
}

export default App
