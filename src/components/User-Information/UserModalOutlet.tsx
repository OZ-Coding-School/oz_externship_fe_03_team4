import type { MappedUser } from "../../types/user";

interface UserModalOutletProps {
  user: MappedUser;
}

export const UserModalOutlet = ({ user }: UserModalOutletProps) => {
  return (
    <div>
      {/* 프로필 섹션 */}
      <div className="flex gap-4 mb-4">
        <img
          src={`https://i.pravatar.cc/80?u=${user.id}`}
          alt={user.nickname}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p className="font-bold">{user.nickname}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* 상세정보 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <InfoItem label="회원 ID" value={user.id} />
        <InfoItem label="이메일" value={user.email} />
        <InfoItem label="이름" value={user.name} />
        <InfoItem label="성별" value="남성" />
        <InfoItem label="닉네임" value={user.nickname} />
        <InfoItem label="생년월일" value={user.birthday} />
        <InfoItem label="전화번호" value="010-1234-5678" />
        <InfoItem label="권한" value={user.role} />
        <InfoItem label="상태" value={user.status} />
        <InfoItem label="가입일" value={user.joinedAt} />
      </div>
    </div>
  );
};

// 내부에서 재사용되는 작은 컴포넌트
const InfoItem = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="p-2 bg-gray-100 rounded font-light text-gray-700 text-sm">
      {value}
    </p>
  </div>
);