import { Outlet } from 'react-router'
import Sidebar from './sidebar'
import type { ReactElement } from 'react'

export default function Layout(): ReactElement {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto flex w-full max-w-[110rem] gap-6 px-4 py-8">
        <aside
          className="sticky top-8 block h-[calc(100vh-4rem)] w-64 shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-white"
          aria-label="Admin navigation"
        >
          <Sidebar />
        </aside>

        <main className="min-h-[70vh] flex-1 rounded-2xl border border-black/5 bg-gray-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
