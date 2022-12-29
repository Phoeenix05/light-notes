interface IFileItem {
  name: string | undefined
  path: string
}

const FileItem = ({ name, path }: IFileItem) => {
  return (<p class='text-white'>{ name }</p>)
}

export default FileItem