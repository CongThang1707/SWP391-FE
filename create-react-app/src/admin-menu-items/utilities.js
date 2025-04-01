//utilities.js
// assets
import { IconUserFilled, IconReportMedical, IconShadow, IconWindmill, IconReceiptDollar, IconBabyCarriage, IconArticle,IconMessages,IconReservedLine,IconStar } from '@tabler/icons-react';

// constant
const icons = {
  IconUserFilled,
  IconReportMedical,
  IconShadow,
  IconWindmill,
  IconReceiptDollar,
  IconBabyCarriage,
  IconArticle,
  IconMessages,
  IconReservedLine,
  IconStar
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Actors',
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
      icon: icons.IconBabyCarriage,
      breadcrumbs: false
    },
    // {
    //   id: 'util-blog',
    //   title: 'Blog',
    //   type: 'item',
    //   url: '/utils/util-blog',
    //   icon: icons.IconArticle,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-comment',
    //   title: 'Comment',
    //   type: 'item',
    //   url: '/utils/util-comment',
    //   icon: icons.IconMessages,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-booking',
    //   title: 'Booking',
    //   type: 'item',
    //   url: '/utils/util-booking',
    //   icon: icons.IconReservedLine,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-feedback',
    //   title: 'Feedback',
    //   type: 'item',
    //   url: '/utils/util-feedback',
    //   icon: icons.IconStar,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-consulting',
    //   title: 'Consulting',
    //   type: 'item',
    //   url: '/utils/util-consulting',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-membership',
    //   title: 'Membership',
    //   type: 'item',
    //   url: '/utils/util-membership',
    //   icon: icons.IconReceiptDollar,
    //   breadcrumbs: false
    // },
    {
      id: 'util-parentpremium',
      title: 'Parent Premium',
      type: 'item',
      url: '/utils/util-parentpremium',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
    // {
    //   id: 'util-paymenthistory',
    //   title: 'History Payment',
    //   type: 'item',
    //   url: '/utils/util-paymenthistory',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // }
    // {
    //   id: 'icons',
    //   title: 'Icons',
    //   type: 'collapse',
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: 'item',
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: 'item',
    //       external: true,
    //       target: '_blank',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default utilities;
