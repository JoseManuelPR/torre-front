import { Icon } from '@iconify/react';
import shoppingBagOutline from '@iconify/icons-eva/shopping-bag-outline';
import personOutline from '@iconify/icons-eva/person-outline';
import peopleFill from '@iconify/icons-eva/people-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Works',
    path: '/dashboard/opportunities',
    icon: getIcon(shoppingBagOutline)
  },
  {
    title: 'People',
    path: '/dashboard/bios',
    icon: getIcon(peopleFill)
  },
  {
    title: 'My genome',
    path: '/dashboard/me',
    icon: getIcon(personOutline)
  }
];

export default sidebarConfig;
