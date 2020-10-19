export const sForm = {
    pageBodyUrl: 'app-sform',
    pageHeading: 'Students Registration Form',
    showSearchBar: false,
    pageTitle: {
      breadCrumb: [
        {
          title: 'Dashboard',
          url: 'admin/dashboard/index',
          clickable: false
        },
        {
          title: 'Students',
          url: '',
          clickable: false
        }
      ],
      leftComponentUrl: 'page-header-chart',
      pageTitle: 'Students'
    },
    showPageAction: false,
    title: ':: Simbayu :: Venus :: Students ::',
    store: 'studentspageconfig'
};
export const sGrid = {
  pageBodyUrl: 'app-sgrid',
  pageHeading: 'Students',
  showSearchBar: false,
  pageTitle: {
    breadCrumb: [
      {
        title: 'Dashboard',
        url: 'admin/dashboard/index',
        clickable: false
      },
      {
        title: 'Students',
        url: '',
        clickable: false
      }
    ],
    leftComponentUrl: 'page-header-chart',
    pageTitle: 'Students'
  },
  showPageAction: false,
  title: ':: Simbayu :: Venus :: Students ::',
  store: {
    'pageconfig': 'studentspageconfig',
    'navigatingId': 'studentsNavigatingId',
    'gridpageconfig': 'studentsgridpageconfig'
  }
};