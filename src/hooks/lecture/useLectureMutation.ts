import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteLecture } from './deleteLecture'

export const useDeleteLecture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLecture,
    onSuccess: () => {
      // 강의 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['admin:lectures'] })
    },
  })
}
