export default function ChatLoading() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Connecting to AI Mentor…</p>
      </div>
    </div>
  );
}
