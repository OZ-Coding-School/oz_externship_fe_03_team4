// twMerge를 사용하여 cn함수(className) 생성
// 클래스가 많은 곳일수록 빛을 발하는 친구입니다.

import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export const cn = (...inputs: Array<string | undefined | null | false>) => {
  return twMerge(clsx(inputs))
}
