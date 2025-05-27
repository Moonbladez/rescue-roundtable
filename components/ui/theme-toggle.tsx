'use client';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, systemTheme, setTheme } = useTheme();
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: false });

  const current = systemTheme && theme === 'system' ? systemTheme : theme;

  const isDark = current === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ActionIcon
      onClick={() => {
        setTheme(current === 'dark' ? 'light' : 'dark');
        setColorScheme(current === 'dark' ? 'light' : 'dark');
      }}
      title="Toggle color scheme"
      aria-label="Toggle color scheme"
      color={isDark ? 'yellow' : 'black'}
      variant="outline"
      size="sm"
    >
      {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </ActionIcon>
  );
}
