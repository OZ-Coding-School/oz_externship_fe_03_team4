import { Button } from "../buttons/Buttons";

interface ModalFooterProps {
  onClose: () => void;
}

export const ModalFooter = ({ onClose }: ModalFooterProps) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* 왼쪽: 권한 변경 */}
      <Button color="success" size="medium">
        권한 변경하기
      </Button>

      {/* 오른쪽: 수정 / 삭제 */}
      <div className="flex gap-2">
        <Button color="primary" size="medium">
          수정하기
        </Button>
        <Button color="danger" size="medium" onClick={onClose}>
          삭제하기
        </Button>
      </div>
    </div>
  );
};