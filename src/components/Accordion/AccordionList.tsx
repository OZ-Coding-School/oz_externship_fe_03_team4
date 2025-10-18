import type { AccordionListProps } from './AccordionType'

export const AccordionList = ({ items, onSelectItem }: AccordionListProps) => {
  return (
    <ul className="flex flex-col gap-1 rounded-lg border border-gray-200">
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => onSelectItem(item)}
            className="flex w-full items-center gap-2 px-3 py-3 text-left text-gray-700 transition-colors duration-150 hover:bg-gray-100"
          >
            <span>{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
