export function AdminFormClassName(
  ...classNames: Array<string | false | null | undefined>
) {
  return classNames.filter(Boolean).join(' ')
}
