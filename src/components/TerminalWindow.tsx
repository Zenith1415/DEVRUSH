import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title = "terminal", children, className = "" }: TerminalWindowProps) => (
  <div className={`terminal-window overflow-hidden ${className}`}>
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/30">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-destructive/70" />
        <div className="w-3 h-3 rounded-full bg-neon-yellow/70" />
        <div className="w-3 h-3 rounded-full bg-neon-green/70" />
      </div>
      <span className="font-terminal text-xs text-muted-foreground ml-2">{title}</span>
    </div>
    <div className="p-4 font-terminal text-sm">{children}</div>
  </div>
);

export default TerminalWindow;
