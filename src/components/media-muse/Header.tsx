import { Music4 } from "lucide-react";

export function Header() {
  return (
    <header className="p-4 border-b bg-card">
      <div className="container mx-auto flex items-center gap-3">
        <Music4 className="text-primary h-8 w-8" />
        <h1 className="text-2xl font-bold text-foreground">Media Muse</h1>
      </div>
    </header>
  );
}
