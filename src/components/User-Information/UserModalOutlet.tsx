import { useState, type ChangeEvent } from "react";
import type { MappedUser } from "../../types/user";

interface UserModalOutletProps {
  user: MappedUser;
  isEditing: boolean;
  onUserChange: (user: MappedUser) => void;
}

export const UserModalOutlet = ({
  user,
  isEditing,
  onUserChange,
}: UserModalOutletProps) => {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(
    typeof user.avatar === "string" ? user.avatar : null
  );

  const handleChange = (field: keyof MappedUser, value: string) => {
    onUserChange({ ...user, [field]: value });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewAvatar(result);
      onUserChange({ ...user, avatar: result });
    };
    reader.readAsDataURL(file);
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
        {/* 회원 ID - 항상 읽기 전용 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">회원 ID</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{user.id}</p>
          </div>
        </div>

        {/* 이메일 - 항상 읽기 전용 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">이메일</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        {/* 닉네임 - 수정 가능 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">닉네임</p>
          {isEditing ? (
            <input
              type="text"
              className={`p-3 rounded-lg w-full ${
                isEditing ? "border border-gray-300" : "border-none bg-gray-50"
              }`}
              value={user.nickname}
              onChange={(e) => handleChange("nickname", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{user.nickname}</p>
            </div>
          )}
        </div>

        {/* 이름 - 수정 가능 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">이름</p>
          {isEditing ? (
            <input
              type="text"
              className={`p-3 rounded-lg w-full ${
                isEditing ? "border border-gray-300" : "border-none bg-gray-50"
              }`}
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{user.name}</p>
            </div>
          )}
        </div>

        {/* 생년월일 - 수정 가능 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">생년월일</p>
          {isEditing ? (
            <input
              type="date"
              className={`p-3 rounded-lg w-full ${
                isEditing ? "border border-gray-300" : "border-none bg-gray-50"
              }`}
              value={user.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{user.birthday}</p>
            </div>
          )}
        </div>

        {/* 권한 - 항상 읽기 전용 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">권한</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{user.role}</p>
          </div>
        </div>

        {/* 상태 - 수정 가능 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">상태</p>
          {isEditing ? (
            <select
              className={`p-3 rounded-lg w-full ${
                isEditing ? "border border-gray-300" : "border-none bg-gray-50"
              }`}
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

        {/* 가입일시 - 항상 읽기 전용 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">가입일</p>
          <div className="p-3 rounded-lg bg-gray-50 border-none">
            <p className="font-medium">{user.joinedAt}</p>
          </div>
        </div>

        {/* 탈퇴일 - 수정 가능 */}
        <div>
          <p className="text-xs text-gray-500 mb-1">탈퇴일</p>
          {isEditing ? (
            <input
              type="date"
              className={`p-3 rounded-lg w-full ${
                isEditing ? "border border-gray-300" : "border-none bg-gray-50"
              }`}
              value={user.withdrawAt}
              onChange={(e) => handleChange("withdrawAt", e.target.value)}
            />
          ) : (
            <div className="p-3 rounded-lg bg-gray-50 border-none">
              <p className="font-medium">{user.withdrawAt}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};