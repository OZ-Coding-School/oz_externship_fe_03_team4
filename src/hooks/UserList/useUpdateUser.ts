import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";
import type { MappedUser } from "../../types/user";
import { getAccessToken } from "../../lib/token";

// FormData 또는 기존 객체 모두 허용하도록 타입 정의
type UpdateUserData = Partial<MappedUser> | FormData;

async function updateUser(userId: string | number, data: UpdateUserData) {
  const token = getAccessToken();
  if (!token) throw new Error("토큰이 없습니다.");

  const headers =
    data instanceof FormData
      ? { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      : { Authorization: `Bearer ${token}` };

  const response = await api.patch(`/v1/admin/users/${userId}`, data, { headers });
  return response.data;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string | number; data: UpdateUserData }) =>
      updateUser(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["userDetail", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};