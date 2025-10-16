/**
 * Button 로딩 스피너
 * - currentColor를 사용하므로 부모의 텍스트 색을 상속합니다.
 * - size(px)로 둘레를 조절할 수 있습니다.
 */
export type SpinnerProps = {
  size?: number
}

export const Spinner = ({ size = 16 }: SpinnerProps) => (
  <span
    className="inline-block animate-spin"
    aria-hidden="true"
    style={{
      width: size,
      height: size,
      borderRadius: 9999,
      border: '2px solid currentColor',
      borderRightColor: 'transparent',
    }}
  />
)
