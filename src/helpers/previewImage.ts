export const previewImage = (
  e: any,
  setImagePreview: (imagePreview: any) => void,
  setImage: (image: File) => void
) => {
  const file = e.target.files[0]
  setImage(file)

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    setImagePreview(reader.result)
  }
}
