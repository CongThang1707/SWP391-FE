// assets
import { IconUserFilled, IconReportMedical, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconUserFilled,
  IconReportMedical,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Parents',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconUserFilled,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Doctors',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconReportMedical,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Children',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-blog',
      title: 'Blog',
      type: 'item',
      url: '/utils/util-blog',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-booking',
      title: 'Booking',
      type: 'item',
      url: '/utils/util-booking',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Icons',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
