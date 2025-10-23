import api from '../../lib/axios'

export const deleteLecture = async (uuid: string): Promise<void> => {
  await api.delete(`/v1/admin/lectures/${uuid}`)
}
