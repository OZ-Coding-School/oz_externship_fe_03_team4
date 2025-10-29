import { useState } from 'react';
import WithdrawReasondoughnut from './WithdrawReasondoughnut';
import WithdrawReasonstick from './WithdrawReasonstick';

interface WithdrawtrendChartProps {
  isAnimationActive?: boolean;
}

const Withdrawtrend = ({ isAnimationActive = true }: WithdrawtrendChartProps) => {
  const [selectedReason, setSelectedReason] = useState('서비스 불만족');

  return (
    <div className="flex flex-col gap-6">
      <WithdrawReasondoughnut isAnimationActive={isAnimationActive} />
      <WithdrawReasonstick
        selectedReason={selectedReason}
        onReasonChange={setSelectedReason}
        isAnimationActive={isAnimationActive}
      />
    </div>
  );
};

export default Withdrawtrend