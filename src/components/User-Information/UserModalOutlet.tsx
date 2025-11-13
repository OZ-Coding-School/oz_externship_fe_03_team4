import React, { useEffect, useState, type ChangeEvent } from "react";
import { useUserDetail } from "../../hooks/UserList/useUserDeatil";
import type { MappedUser } from "../../types/user";
import { formatPhone } from "../../utils/formatPhone";

interface UserModalOutletProps {
  userId: string | number;
  isEditing: boolean;
  onUserChange: (user: MappedUser) => void;
}

const UserModalOutletComponent = ({
  userId,
  isEditing,
  onUserChange,
}: UserModalOutletProps) => {
  const { data: user, isLoading, error } = useUserDetail(userId);
  const [localUser, setLocalUser] = useState<MappedUser | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isEditing) {
      setLocalUser(user);
      onUserChange(user);
    }
  }, [user, isEditing, onUserChange]);

  if (isLoading)
    return (
      <p className="p-6 text-center text-gray-500">회원 정보를 불러오는 중...</p>
    );
  if (error)
    return (
      <p className="p-6 text-center text-red-500">
        회원 정보를 불러오지 못했습니다.
      </p>
    );
  if (!localUser) return null;

  // 입력 변경 시 로컬 + 부모 상태 동기화
  const handleChange = (field: keyof MappedUser, value: string) => {
    const updated = { ...localUser, [field]: value };
    setLocalUser(updated);
    onUserChange(updated);
  };

  // 프로필 이미지 변경 처리
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewAvatar(reader.result); // 미리보기 전용
      }
    };
    reader.readAsDataURL(file);

    // 실제 업로드용 File은 avatar에 저장
    const updated = { ...localUser, avatar: file };
    setLocalUser(updated);
    onUserChange(updated);
  };

  return (
    <div className="mt-4">
      {/* 프로필 영역 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative">
          {previewAvatar ? (
            <img
              src={previewAvatar}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : localUser.avatar instanceof File ? (
            <img
              src={URL.createObjectURL(localUser.avatar)}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : typeof localUser.avatar === "string" ? (
            <img
              src={localUser.avatar}
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
        {/* 회원 ID (읽기 전용) */}
        <div>
          <p className="text-xs text-gray-500 mb-1">회원 ID</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{localUser.id}</p>
          </div>
        </div>

        {/* 이메일 (읽기 전용) */}
        <div>
          <p className="text-xs text-gray-500 mb-1">이메일</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{localUser.email}</p>
          </div>
        </div>

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

        {/* 성별 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">성별</p>
          {isEditing ? (
            <select
              className="p-3 rounded-lg w-full border border-gray-300"
              value={localUser.gender ?? "M"}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">
                {localUser.gender === "F" ? "여성" : "남성"}
              </p>
            </div>
          )}
        </div>

        {/* 권한 (읽기 전용) */}
        <div>
          <p className="text-xs text-gray-500 mb-1">권한</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{localUser.role}</p>
          </div>
        </div>

        {/* 회원 가입 일시 (읽기 전용) */}
        <div>
          <p className="text-xs text-gray-500 mb-1">회원 가입 일시</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{localUser.joinedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

//불필요한 리렌더 방지
export const UserModalOutlet = React.memo(UserModalOutletComponent);
