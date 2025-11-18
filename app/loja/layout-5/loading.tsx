import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Top Bar Skeleton */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 py-2">
        <div className="container mx-auto px-4">
          <Skeleton className="h-4 w-64 bg-pink-300/50" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="bg-white shadow-lg border-b-4 border-pink-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-12 w-48 rounded-2xl" />
            <Skeleton className="h-12 w-96 rounded-full hidden md:block" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="bg-white border-b-2 border-pink-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-8 w-48 mx-auto mb-6 rounded-full" />
            <Skeleton className="h-16 w-full max-w-2xl mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto mb-8" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-3xl" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
