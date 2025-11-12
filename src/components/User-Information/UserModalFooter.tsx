import { Button } from "../buttons/Buttons";
import Modal from "../modal/Modal";
import { useState } from "react";
import type { MappedUser } from "../../types/user";
import { updateUserRole } from "../../api/updateUserRole";
import { useToastStore } from "../../store/toastStore";
import { AlertTriangle } from "lucide-react";
import { getAccessToken } from "../../lib/token";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "../../components/toast/toastContainer";
import { useUpdateUser } from "../../hooks/UserList/useUpdateUser";

interface ModalFooterProps {
  onClose: () => void;
  isEditing: boolean;
  onEditToggle: () => void;
  user: MappedUser;
  onRoleChange: (role: "admin" | "staff" | "user") => void;
  onDelete: (userId: string) => void;
}

export const UserModalFooter = ({
  isEditing,
  onEditToggle,
  user,
  onRoleChange,
  onDelete,
}: ModalFooterProps) => {
  const queryClient = useQueryClient();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"admin" | "staff" | "user">(
    user.role === "관리자" ? "admin" : user.role === "스태프" ? "staff" : "user"
  );

  const { showSuccess } = useToastStore();

  // 회원정보 수정 mutation
  const updateUserMutation = useUpdateUser();

  const roles = [
    { key: "admin", label: "관리자" },
    { key: "staff", label: "스태프" },
    { key: "user", label: "일반회원" },
  ];

  // 수정 저장 버튼
  const handleSave = async () => {
    try {
      const token = getAccessToken();
      if (!token) throw new Error("토큰이 없습니다.");

      // PATCH 요청: 수정된 user 데이터 전달
      await updateUserMutation.mutateAsync({
        userId: user.id,
        data: {
          name: user.name,
          nickname: user.nickname,
          phone_number: user.phone,
          gender: user.gender || "M",
          status:
            user.status === "활성"
              ? "active"
              : user.status === "비활성"
              ? "inactive"
              : "withdraw_requested",
          profile_img_url: user.avatar || "",
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["userDetail", user.id] });

      showSuccess("회원 정보 수정 완료", "회원 정보가 성공적으로 수정되었습니다.");
      onEditToggle(); // 읽기 모드 전환
    } catch {
      setIsAlertOpen(true);
    }
  };

  const handleRoleChangeConfirm = async () => {
    try {
      const token = getAccessToken();
      if (!token) throw new Error("토큰이 없습니다.");

      await updateUserRole(Number(user.id), selectedRole, token);
      await queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["userDetail", user.id] });

      onRoleChange(selectedRole);
      setIsRoleModalOpen(false);
      showSuccess("권한 변경 완료", "회원 권한이 성공적으로 변경되었습니다.");
    } catch {
      setIsRoleModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    onDelete(String(user.id));
    setIsDeleteConfirmOpen(false);
    setIsAlertOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-6">
        <Button
          color="success"
          size="medium"
          onClick={() => setIsRoleModalOpen(true)}
        >
          권한 변경하기
        </Button>

        <div className="flex gap-2">
          {isEditing ? (
            <Button
              color="primary"
              size="medium"
              onClick={handleSave}
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending ? "저장 중..." : "저장하기"}
            </Button>
          ) : (
            <Button color="primary" size="medium" onClick={onEditToggle}>
              수정하기
            </Button>
          )}
          <Button
            color="danger"
            size="medium"
            onClick={() => setIsDeleteConfirmOpen(true)}
          >
            삭제하기
          </Button>
        </div>
      </div>

      {/* 권한 변경 모달 */}
      <Modal
        isOn={isRoleModalOpen}
        onBackgroundClick={() => setIsRoleModalOpen(false)}
        className="w-[400px] max-h-[400px]"
      >
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 text-left">권한 변경</h2>
          <div className="flex flex-col gap-3 mb-6">
            {roles.map((role) => (
              <div
                key={role.key}
                onClick={() =>
                  setSelectedRole(role.key as "admin" | "staff" | "user")
                }
                className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 ${
                  selectedRole === role.key
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <p
                  className={`font-light text-left ${
                    selectedRole === role.key
                      ? "text-green-600"
                      : "text-gray-800"
                  }`}
                >
                  {role.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              color="secondary"
              size="medium"
              onClick={() => setIsRoleModalOpen(false)}
            >
              취소
            </Button>
            <Button
              color="success"
              size="medium"
              onClick={handleRoleChangeConfirm}
            >
              변경하기
            </Button>
          </div>
        </div>
      </Modal>

      {/* 삭제 확인 모달 */}
      <Modal
        isOn={isDeleteConfirmOpen}
        onBackgroundClick={() => setIsDeleteConfirmOpen(false)}
        className="w-[525px]"
      >
        <div className="p-6 text-center">
          <h2 className="text-lg font-bold mb-4">회원 삭제 확인</h2>
          <p className="mb-6">
            삭제 시 해당 유저와 관련된 모든 데이터가 즉시 삭제되며 되돌릴 수 없습니다.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              color="secondary"
              size="medium"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              취소
            </Button>
            <Button color="danger" size="medium" onClick={handleDeleteConfirm}>
              삭제
            </Button>
          </div>
        </div>
      </Modal>

      {/* 오류 모달 */}
      <Modal
        isOn={isAlertOpen}
        onBackgroundClick={() => setIsAlertOpen(false)}
        className="w-[400px] max-h-[600px]"
      >
        <div className="p-6 text-center">
          <h2 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            알림
          </h2>
          <p className="mb-6">요청 처리 중 오류가 발생했습니다.</p>
          <Button
            color="danger"
            size="medium"
            onClick={() => setIsAlertOpen(false)}
          >
            확인
          </Button>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
};