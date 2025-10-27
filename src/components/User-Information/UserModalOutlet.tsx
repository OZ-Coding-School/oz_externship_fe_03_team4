import type { MappedUser } from "../../types/user";

interface UserModalOutletProps {
  user: MappedUser;
  isEditing: boolean;
  onUserChange: (updatedUser: MappedUser) => void;
}

export const UserModalOutlet = ({
  user,
  isEditing,
  onUserChange,
}: UserModalOutletProps) => {
  const handleChange = (field: keyof MappedUser, value: string) => {
    onUserChange({ ...user, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        handleChange("id", reader.result as string); // 임시 이미지 식별용
      };
      reader.readAsDataURL(file);
    }
  };

  const userIdStr = String(user.id);

  return (
    <div>
      {/* 프로필 섹션 */}
      <div className="flex gap-4 mb-4 items-center">
        {isEditing ? (
          <div className="flex flex-col items-center">
            <img
              src={userIdStr.startsWith("data:") ? userIdStr : `https://i.pravatar.cc/80?u=${userIdStr}`}
              alt={user.nickname}
              className="w-20 h-20 rounded-full border mb-2"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          </div>
        ) : (
          <img src={`https://i.pravatar.cc/80?u=${userIdStr}`} alt={user.nickname} className="w-20 h-20 rounded-full border" />
        )}

        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={user.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                className="w-full border rounded p-1 mb-1"
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border rounded p-1"
              />
            </>
          ) : (
            <>
              <p className="font-bold">{user.nickname}</p>
              <p className="text-gray-500">{user.email}</p>
            </>
          )}
        </div>
      </div>

      {/* 상세정보 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "회원 ID", field: "id" },
          { label: "이메일", field: "email" },
          { label: "이름", field: "name" },
          { label: "성별", field: "gender" },
          { label: "닉네임", field: "nickname" },
          { label: "생년월일", field: "birthday" },
          { label: "전화번호", field: "phone" },
          { label: "권한", field: "role" },
          { label: "상태", field: "status" },
          { label: "가입일", field: "joinedAt" },
        ].map((item) => (
          <div key={item.field}>
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            {isEditing ? (
              <input
                type="text"
                value={String(user[item.field as keyof MappedUser] ?? "")}
                onChange={(e) => handleChange(item.field as keyof MappedUser, e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded font-light text-gray-700 text-sm">
                {String(user[item.field as keyof MappedUser] ?? "-")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};