// FormUI 예제 파일
import { useState } from 'react'
import {
  FormField,
  TextField,
  TextArea,
  Checkbox,
  Radio,
  Select,
  Slider,
  Switch,
} from '.' // 경로는 여러분의 위치에 맞춰서 임포트 해주시면 됩니당 ㅎ

export default function ExampleForm() {
  const [volume, setVolume] = useState(50)
  const [isActive, setIsActive] = useState(false)

  return (
    <form className="mx-auto mt-6 max-w-md space-y-6 rounded-xl bg-white p-6 shadow">
      {/* 텍스트 입력 */}
      {/* FormField 필수값 : id, children(실제입력필드, 예:텍스트필드,셀렉트 박스 등등) */}
      <FormField id="email" label="이메일" hint="회사 이메일을 입력하세요">
        {/* TextField 필수값 : id | 그 외의 값(type,placeholder,은 필수 요소 아님 */}
        <TextField
          id="email" // 필수
          type="email" // 타입 기본값은 "text"
          placeholder="example@company.com"
          required // 타입 boolean, 이 항목이 필수인지 아닌지
        />
      </FormField>

      {/* 멀티라인 입력 */}
      <FormField id="desc" label="소개" hint="200자 이내로 작성해주세요">
        <TextArea id="desc" rows={5} placeholder="자기소개를 입력하세요" />
      </FormField>

      {/* 셀렉트 박스 */}
      <FormField id="plan" label="팀 선택">
        <Select defaultValue="">
          <option value="" disabled>
            선택하세요
          </option>
          <option value="FE_4">FE_4</option>
          <option value="BE_4">BE_4</option>
        </Select>
      </FormField>

      {/* 라디오 버튼 */}
      <FormField id="gender" label="성별">
        <div className="flex gap-4">
          <Radio id="male" name="gender" label="남성" />
          <Radio id="female" name="gender" label="여성" />
        </div>
      </FormField>

      {/* 체크박스 */}
      <Checkbox id="agree" label="약관에 동의합니다" required />

      {/* 스위치 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-800">
          알림 수신 여부
        </span>
        <Switch checked={isActive} onClick={() => setIsActive(!isActive)} />
      </div>

      {/* 슬라이더 */}
      <FormField id="volume" label="수량 조절">
        <Slider
          min={0}
          max={100}
          step={5}
          showValue
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </FormField>

      {/* 제출 */}
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-amber-500 py-2 font-medium text-white transition hover:bg-amber-600"
      >
        제출하기
      </button>
    </form>
  )
}
