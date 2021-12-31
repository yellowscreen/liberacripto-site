
import { useUIStore } from '@/stores/ui'
import { showSnackbar } from '@/composables/useSnackbar'
import { getS3Credentials, postUploadReceipt } from '@/services/order'

type UploadFileParams = {
  inputQuerySelector?: string
}

export async function uploadFileToS3({
  inputQuerySelector = 'input[type="file"]',

}: UploadFileParams = {}): Promise<{
    receiptUrl: string
  } | undefined> {
  const ui = useUIStore()

  const inpt = document.querySelector(inputQuerySelector) as HTMLInputElement
  const file = inpt.files?.[0]

  try {
    if (file) {
      const extension = file.name.split('.').pop()
      ui.toggleLoader(true)
      const { data } = await getS3Credentials(extension as string)
      const { fields, url } = data

      if (fields.Policy) {
        const { headers } = await postUploadReceipt(fields, url, file)
        const receiptUrl: string = headers?.location ?? headers?.Location

        return { receiptUrl }
      }
    }
    throw new Error('Arquivo é requerido')
  }
  catch (er) {
    inpt.value = ''
    showSnackbar({ title: 'Ocorreu um erro ao enviar o comprovante', type: 'danger' })
  }
  finally {
    ui.toggleLoader(false)
  }
}
