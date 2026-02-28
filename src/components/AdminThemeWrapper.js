'use client';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export default function AdminThemeWrapper({ children }) {
  return (
    <Theme appearance="light" radius="medium" scaling="100%">
      {children}
    </Theme>
  );
}
