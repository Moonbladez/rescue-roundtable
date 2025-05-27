import { Anchor, Breadcrumbs } from '@mantine/core';
import Link from 'next/link';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

export const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <Breadcrumbs>
      {items.map((item) => (
        <Anchor
          key={item.title}
          href={item.href ?? '#'}
          component={Link}
          size="sm"
        >
          {item.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
};
