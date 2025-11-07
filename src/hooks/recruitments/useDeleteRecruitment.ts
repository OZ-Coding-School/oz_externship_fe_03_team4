import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/axios'

export const useDeleteRecruitment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number | string) => {
      try {
        await api.delete(`/v1/admin/recruitments/${id}`)
      } catch {
        await api.delete(`/v1/admin/recruitments/${id}`)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey.some((keyPart) =>
            String(keyPart).toLowerCase().includes('recruit')
          ),
      })
    },
  })
}
