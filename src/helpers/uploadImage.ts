import axios from 'axios'

const uploadImage = async (image: File) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
  const formData = new FormData()

  formData.append('file', image)
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  )

  try {
    const response = await axios.post(url, formData)
    return response.data.url
  } catch (error) {
    console.error(error)
  }
}

export default uploadImage
