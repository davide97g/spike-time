import { ReactNode } from "react";

export function Page({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="container h-full w-full mx-auto px-2 py-2 text-left relative">
      {children}
    </div>
  );
}
