import { useState } from 'react';
import SignupChart from './chart/Signuptrend';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'signup' | 'withdraw' | 'reason'>('signup');

  return (
    <div className="p-6 w-full h-screen">
      <div className="bg-white rounded-lg shadow h-full flex flex-col">
        {/* 탭 네비게이션 */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('signup')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'signup'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            회원가입 추세
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'withdraw'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            회원탈퇴 추세
          </button>
          <button
            onClick={() => setActiveTab('reason')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'reason'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            탈퇴 사유 분석
          </button>
        </div>

        {/* 차트 영역 */}
        <div className="flex-1 p-8">
          {activeTab === 'signup' && <SignupChart />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;