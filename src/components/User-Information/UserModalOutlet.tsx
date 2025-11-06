import { useEffect, useState, type ChangeEvent } from "react";
import { useUserDetail } from "../../hooks/UserList/useUserDeatil";
import type { MappedUser } from "../../types/user";
import { formatPhone } from "../../utils/formatPhone";

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
  const [localUser, setLocalUser] = useState<MappedUser | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  // ✅ 서버에서 데이터 받아오면 로컬 상태에 저장
  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  if (isLoading)
    return <p className="p-6 text-center text-gray-500">회원 정보를 불러오는 중...</p>;
  if (error)
    return <p className="p-6 text-center text-red-500">회원 정보를 불러오지 못했습니다.</p>;
  if (!localUser) return null;

  // ✅ 변경 핸들러 (로컬 + 부모 동기화)
  const handleChange = (field: keyof MappedUser, value: string) => {
    const updated = { ...localUser, [field]: value };
    setLocalUser(updated);
    onUserChange(updated);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewAvatar(reader.result);
        const updated = { ...localUser, avatar: reader.result };
        setLocalUser(updated);
        onUserChange(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-4">
      {/* 프로필 영역 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative">
          {previewAvatar || localUser.avatar ? (
            <img
              src={previewAvatar || localUser.avatar || ""}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-500">
              {localUser.nickname.charAt(0)}
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
          <p className="text-lg font-semibold">{localUser.nickname}</p>
          <p className="text-sm text-gray-500">{localUser.email}</p>
        </div>
      </div>

      {/* 상세 정보 영역 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 이름 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">이름</p>
          {isEditing ? (
            <input
              type="text"
              className="p-3 rounded-lg w-full border border-gray-300"
              value={localUser.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{localUser.name}</p>
            </div>
          )}
        </div>

        {/* 상태 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">상태</p>
          {isEditing ? (
            <select
              className="p-3 rounded-lg w-full border border-gray-300"
              value={localUser.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="활성">활성</option>
              <option value="비활성">비활성</option>
              <option value="탈퇴요청">탈퇴요청</option>
            </select>
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{localUser.status}</p>
            </div>
          )}
        </div>

        {/* 닉네임 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">닉네임</p>
          {isEditing ? (
            <input
              type="text"
              className="p-3 rounded-lg w-full border border-gray-300"
              value={localUser.nickname}
              onChange={(e) => handleChange("nickname", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{localUser.nickname}</p>
            </div>
          )}
        </div>

        {/* 전화번호 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">전화번호</p>
          {isEditing ? (
            <input
              type="text"
              className="p-3 rounded-lg w-full border border-gray-300"
              value={localUser.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{formatPhone(localUser.phone)}</p>
            </div>
          )}
        </div>

        {/* 생년월일 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">생년월일</p>
          {isEditing ? (
            <input
              type="date"
              className="p-3 rounded-lg w-full border border-gray-300"
              value={localUser.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{localUser.birthday}</p>
            </div>
          )}
        </div>

        {/* 기타 항목 동일 */}
      </div>
    </div>
  );
};