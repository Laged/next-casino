export default function Loading() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Ladataan...</p>
      </div>
    </div>
  );
}
