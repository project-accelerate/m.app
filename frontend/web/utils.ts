export function toDataUri(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.error = () => reject(reader.error)

    reader.readAsDataURL(blob)
  })
}
