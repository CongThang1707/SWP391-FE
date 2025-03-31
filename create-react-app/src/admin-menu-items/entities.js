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

const entities = {
  id: 'utilities',
  title: 'Entities',
  type: 'group',
  children: [
    {
      id: 'util-blog',
      title: 'Blog',
      type: 'item',
      url: '/utils/util-blog',
      icon: icons.IconArticle,
      breadcrumbs: false
    },
    {
      id: 'util-comment',
      title: 'Comment',
      type: 'item',
      url: '/utils/util-comment',
      icon: icons.IconMessages,
      breadcrumbs: false
    },
    {
      id: 'util-booking',
      title: 'Booking',
      type: 'item',
      url: '/utils/util-booking',
      icon: icons.IconReservedLine,
      breadcrumbs: false
    },
    {
      id: 'util-feedback',
      title: 'Feedback',
      type: 'item',
      url: '/utils/util-feedback',
      icon: icons.IconStar,
      breadcrumbs: false
    },
    {
      id: 'util-consulting',
      title: 'Consulting',
      type: 'item',
      url: '/utils/util-consulting',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-membership',
      title: 'Membership',
      type: 'item',
      url: '/utils/util-membership',
      icon: icons.IconReceiptDollar,
      breadcrumbs: false
    },

    {
      id: 'util-paymenthistory',
      title: 'History Payment',
      type: 'item',
      url: '/utils/util-paymenthistory',
      icon: icons.IconShadow,
      breadcrumbs: false
    }

  ]
};

export default entities;
