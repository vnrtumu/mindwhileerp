export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: string;
  children?: ChildItem[];
  item?: unknown;
  url?: string;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: string;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: string;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  isPro?: boolean;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  // ==================== NON-PRO SECTIONS ====================
  {
    heading: 'Home',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/super/dashboard',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'My Profile',
        icon: 'solar:user-circle-linear',
        url: '/super/user-profile',
        isPro: false,
      },
    ],
  },

  {
    heading: 'SASS Management',
    children: [
      {
        name: 'Schools list',
        icon: 'solar:server-linear',
        id: uniqueId(),
        url: '/super/utilities/schools',
      },
      {
        name: 'Manage Plans',
        icon: 'solar:document-add-linear',
        id: uniqueId(),
        url: '/super/utilities/plans',
      },
      {
        name: 'Payment History',
        icon: 'solar:document-add-linear',
        id: uniqueId(),
        url: '/super/utilities/payment-history',
      },

    ],
  },
  {
    heading: 'Systems & Settings',
    children: [
      {
        name: 'Platform Configuration',
        id: uniqueId(),
        icon: 'solar:settings-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Platform Settings',
            url: '/super/settings/platform',
            isPro: false,
          },
          {
            id: uniqueId(),
            name: 'Payment Gateways',
            url: '/super/apps/blog/post',
            isPro: false,
          },
          {
            id: uniqueId(),
            name: 'SMS Gateway',
            url: '/super/apps/blog/post',
            isPro: false,
          },
          {
            id: uniqueId(),
            name: 'Notification Types',
            url: '/super/apps/blog/post',
            isPro: false,
          },
        ],
      },
      {
        name: 'CMS Management',
        id: uniqueId(),
        icon: 'solar:layers-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Role-Based Menu',
            url: '/super/apps/blog/post',
            isPro: false,
          },
          {
            id: uniqueId(),
            name: 'Page Sections',
            url: '/super/apps/blog/post',
            isPro: false,
          },
          {
            id: uniqueId(),
            name: 'Navigation Menu',
            url: '/super/apps/blog/post',
            isPro: false,
          },
        ],
      },
    ],
  },
  {
    heading: 'Ticketing Tool',
    children: [
      {
        id: uniqueId(),
        name: 'Notes',
        icon: 'solar:notes-linear',
        url: '/super/apps/notes',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'Tickets',
        icon: 'solar:ticker-star-linear',
        url: '/super/apps/tickets',
        isPro: false,
      },
      {
        name: 'Blogs',
        id: uniqueId(),
        icon: 'solar:sort-by-alphabet-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Blog Post',
            url: '/super/apps/blog/post',
            isPro: false,
          },
          {
            id: uniqueId(),
            name: 'Blog Detail',
            url: '/super/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
            isPro: false,
          },
        ],
      },
    ],
  },

];

export default SidebarContent;
