type onClick = () => void

interface IFileItem {
  onClick: onClick
  name: string | undefined
  path: string
}

const FileItem = ({ onClick, name, path }: IFileItem) => {
  return (
    <div onClick={() => onClick()} class='flex items-center px-4 text-white w-full min-h-[2rem] cursor-pointer hover:bg-neutral-700/75 truncate'>
      { name }
    </div>
  )
}

export default FileItem