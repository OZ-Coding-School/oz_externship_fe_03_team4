import { useState } from "react";
import { Button } from "../buttons/Buttons";
import Modal from "../modal/Modal";

interface ModalFooterProps {
  onClose: () => void;
}

export const ModalFooter = ({ onClose }: ModalFooterProps) => {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 알람 모달 상태

  const roles = [
    { key: "admin", label: "관리자" },
    { key: "staff", label: "스태프" },
    { key: "user", label: "일반회원" },
  ];

  const handleRoleChangeConfirm = () => {
    setIsRoleModalOpen(false);
    setIsAlertOpen(true); // 변경 후 알람 모달 열기
  };

  return (
    <>
      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <Button
          color="success"
          size="medium"
          onClick={() => setIsRoleModalOpen(true)}
        >
          권한 변경하기
        </Button>

        <div className="flex gap-2">
          <Button color="primary" size="medium">
            수정하기
          </Button>
          <Button color="danger" size="medium" onClick={onClose}>
            삭제하기
          </Button>
        </div>
      </div>

      {/* 권한 변경 모달 */}
      <Modal
        isOn={isRoleModalOpen}
        onBackgroundClick={() => setIsRoleModalOpen(false)}
      >
        <div className="p-6 w-[450px]">
          <h2 className="text-lg font-bold mb-4 text-left">권한 변경</h2>

          <div className="flex flex-col gap-3 mb-6">
            {roles.map((role) => (
              <div
                key={role.key}
                onClick={() => setSelectedRole(role.key)}
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
              className="rounded-lg px-5 py-2"
              onClick={() => setIsRoleModalOpen(false)}
            >
              취소
            </Button>
            <Button
              color="success"
              size="medium"
              className="rounded-lg px-5 py-2"
              onClick={handleRoleChangeConfirm}
            >
              변경하기
            </Button>
          </div>
        </div>
      </Modal>

      {/* 변경 알람 모달 */}
      <Modal isOn={isAlertOpen} onBackgroundClick={() => setIsAlertOpen(false)}>
        <div className="p-6 w-[350px] text-center">
          <h2 className="text-lg font-bold mb-4">알림</h2>
          <p className="mb-6">권한이 변경되었습니다.</p>
          <Button
            color="success"
            size="medium"
            className="rounded-lg px-6 py-2"
            onClick={() => setIsAlertOpen(false)}
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};