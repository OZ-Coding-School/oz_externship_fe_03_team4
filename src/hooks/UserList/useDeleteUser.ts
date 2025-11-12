import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";
import { getAccessToken } from "../../lib/token";

async function deleteUser(userId: string | number) {
  const token = getAccessToken();
  if (!token) throw new Error("토큰이 없습니다.");

  const res = await api.delete(`/v1/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string | number) => deleteUser(userId),
    onSuccess: async (_, userId) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["userDetail", userId] });
    },
  });
};