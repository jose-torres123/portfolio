import { Card, CardContent, CardHeader } from '@/lib/ui'

export function PortfolioSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-6 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded mt-2" />
      </CardHeader>
      <CardContent>
        <div className="h-32 w-full bg-muted rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  )
}

export function PortfolioListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <PortfolioSkeleton key={i} />
      ))}
    </div>
  )
}
