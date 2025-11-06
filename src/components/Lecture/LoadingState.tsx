interface LoadingStateProps {
  message?: string
}

export const LoadingState = ({ message = '로딩 중...' }: LoadingStateProps) => (
  <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
    <p className="text-gray-500">{message}</p>
  </div>
)

interface ErrorStateProps {
  title: string
  message?: string
}

export const ErrorState = ({ title, message }: ErrorStateProps) => (
  <div className="flex h-64 items-center justify-center rounded-lg border border-red-200 bg-red-50">
    <div className="text-center">
      <p className="text-red-600">{title}</p>
      {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </div>
  </div>
)

interface EmptyStateProps {
  title: string
  message?: string
}

export const EmptyState = ({ title, message }: EmptyStateProps) => (
  <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
    <div className="text-center">
      <p className="text-gray-500">{title}</p>
      {message && <p className="mt-1 text-sm text-gray-400">{message}</p>}
    </div>
  </div>
)
