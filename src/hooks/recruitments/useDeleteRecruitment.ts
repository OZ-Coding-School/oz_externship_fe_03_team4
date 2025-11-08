import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/axios'
import { useToastStore } from '../../store/toastStore'

export const useDeleteRecruitment = () => {
  const queryClient = useQueryClient()

  const showSuccess = useToastStore((state) => state.showSuccess)
  const showError = useToastStore((state) => state.showError)

  return useMutation({
    mutationFn: async (id: number | string) => {
      try {
        await api.delete(`/v1/admin/recruitments/${id}`)
      } catch {
        await api.delete(`/v1/admin/recruitments/${id}/`)
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

      showSuccess('공고 삭제 완료', '선택한 공고가 삭제되었습니다.')
    },

    onError: () => {
      showError(
        '공고 삭제 실패',
        '공고 삭제에 실패하였습니다. 잠시 후 다시 시도해 주세요.'
      )
    },
  })
}
