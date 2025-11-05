import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";
import type { MappedUser } from "../../types/user";

async function updateUser(userId: string | number, data: Partial<MappedUser>) {
  const response = await api.patch(`/v1/admin/users/${userId}`, data);
  return response.data;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string | number; data: Partial<MappedUser> }) =>
      updateUser(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["userDetail", variables.userId] });
    },
  });
};