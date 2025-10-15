// twMerge를 사용하여 cn함수(className) 생성
// 클래스가 많은 곳일수록 빛을 발하는 친구입니다.

import { twMerge } from 'tailwind-merge'

export const cn = (...classNames: Array<string | false | null | undefined>) => {
  return twMerge(classNames.filter(Boolean).join(' '))
}
