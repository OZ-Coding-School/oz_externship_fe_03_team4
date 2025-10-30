import { useState, type ChangeEvent } from "react";
import { useUserDetail } from "../../hooks/useUserDeatil"
import type { MappedUser } from "../../types/user";

interface UserModalOutletProps {
  userId: string | number;
  isEditing: boolean;
  onUserChange: (user: MappedUser) => void;
}

export const UserModalOutlet = ({
  userId,
  isEditing,
  onUserChange,
}: UserModalOutletProps) => {
  const { data: user, isLoading, error } = useUserDetail(userId);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  if (isLoading)
    return <p className="p-6 text-center text-gray-500">회원 정보를 불러오는 중...</p>;
  if (error)
    return <p className="p-6 text-center text-red-500">회원 정보를 불러오지 못했습니다.</p>;
  if (!user) return null;

  const handleChange = (field: keyof MappedUser, value: string) => {
    onUserChange({ ...user, [field]: value });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewAvatar(reader.result);
        onUserChange({ ...user, avatar: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-4">
      {/* 프로필 영역 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative">
          {previewAvatar || user.avatar ? (
          <img
            src={previewAvatar || user.avatar || ""}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
          ) : (
            <span className="text-2xl font-bold text-gray-500">
              {user.nickname.charAt(0)}
            </span>
          )}
          {isEditing && (
            <label className="absolute inset-0 cursor-pointer bg-black/20 flex items-center justify-center rounded-full text-white text-sm opacity-0 hover:opacity-100 transition">
              변경
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">{user.nickname}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* 상세 정보 영역 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 회원 ID */}
        <div>
          <p className="text-xs text-gray-500 mb-1">회원 ID</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{user.id}</p>
          </div>
        </div>

        {/* 이메일 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">이메일</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        {/* 이름 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">이름</p>
          {isEditing ? (
            <input
              type="text"
              className="p-3 rounded-lg w-full border border-gray-300"
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{user.name}</p>
            </div>
          )}
        </div>

        {/* 상태 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">상태</p>
          {isEditing ? (
            <select
              className="p-3 rounded-lg w-full border border-gray-300"
              value={user.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="활성">활성</option>
              <option value="비활성">비활성</option>
              <option value="탈퇴요청">탈퇴요청</option>
            </select>
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{user.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};