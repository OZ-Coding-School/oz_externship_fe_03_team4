// 데이터를 나타내주는 인포필드입니다. 데이터를 보여주고 싶으시다면 이 컴포넌트를 import 하시면 됩니다.
type InfoFieldProps = {
  label: string
  value: string | number | null | undefined
  fullWidth?: boolean
}

export const InfoField = ({ label, value, fullWidth }: InfoFieldProps) => (
  <div className={fullWidth ? 'col-span-2' : ''}>
    <p className="mb-1 text-xs text-gray-500">{label}</p>
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="font-medium">{value ?? '-'}</p>
    </div>
  </div>
)
