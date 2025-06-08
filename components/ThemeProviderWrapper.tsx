"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  // Это решает проблему гидратации, отображая контент только после монтирования на клиенте
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Возвращаем пустой div с минимальными стилями, чтобы избежать мерцания
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
