import { FileUpload, FileUploadData } from 'apollo-upload-server'
import { createReadStream, readFileSync } from 'fs'

export const someImage = readFileSync(
  require.resolve('common/test/somePhoto.jpg'),
)

export const someImageUpload = (
  props: Partial<FileUploadData> = {},
): FileUpload =>
  Promise.resolve({
    stream: createReadStream(require.resolve('common/test/somePhoto.jpg')),
    encoding: '',
    filename: 'somePhoto.jpg',
    mimetype: 'image/jpeg',
    ...props,
  })
