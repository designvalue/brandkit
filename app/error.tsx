"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      {error.message ? (
        <p className="text-sm text-muted-foreground max-w-lg text-center font-mono">
          {error.message}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => reset()}
        className="text-sm underline underline-offset-4 hover:opacity-80"
      >
        Try again
      </button>
    </main>
  )
}
