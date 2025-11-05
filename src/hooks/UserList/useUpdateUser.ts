import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";
import type { MappedUser } from "../../types/user";

// PATCH 요청 함수
async function updateUser(userId: number | string, updatedData: Partial<MappedUser>) {
  const response = await api.patch(`/v1/admin/users/${userId}`, updatedData);
  return response.data;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: number | string; data: Partial<MappedUser> }) =>
      updateUser(userId, data),
    onSuccess: (_, variables) => {
      // userDetail 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ["userDetail", variables.userId] });
    },
  });
}