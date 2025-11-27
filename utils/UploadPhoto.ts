import cloudinary from "@/lib/cloudinary"

/* eslint-disable @typescript-eslint/no-explicit-any */
const uploadBuffer = async (buffer: Buffer, fileName?: string) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_UPLOAD_FOLDER,
        resource_type: "auto",
        public_id: fileName ? fileName.replace(/\.[^/.]+$/, "") : undefined,
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}

export const UploadFileToCloudinary = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer())
  const upload = await uploadBuffer(buffer, file.name)
  return { secure_url: upload.secure_url, public_id: upload.public_id }
}

export const UploadFilesToCloudinary = async (files: File[]) => {
  const uploads = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await uploadBuffer(buffer, file.name)
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      }
    })
  )
  return uploads
}
