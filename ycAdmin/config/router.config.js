export default [
  // user
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user", redirect: "/user/login" },
      { path: "/user/login", component: "./User/Login" },
      { path: "/user/register", component: "./User/Register" },
      { path: "/user/register-result", component: "./User/RegisterResult" }
    ]
  },

  // app
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    // authority: ["admin", "user"],
    routes: [
      { path: "/", redirect: "/account/center" },
      // {
      //   name: "account",
      //   icon: "user",
      //   path: "/account",
      //   //hideInMenu: true,
      //   routes: [
      //     {
      //       path: "/account/center",
      //       name: "center",
      //       component: "./Account/Center/Center",
      //       //hideInMenu: true,
      //       // routes: [
      //       //   {
      //       //     path: "/account/center",
      //       //     redirect: "/account/center/articles"
      //       //   },
      //       //   {
      //       //     path: "/account/center/articles",
      //       //     component: "./Account/Center/Articles"
      //       //   },
      //       //   {
      //       //     path: "/account/center/applications",
      //       //     component: "./Account/Center/Applications"
      //       //   },
      //       //   {
      //       //     path: "/account/center/projects",
      //       //     component: "./Account/Center/Projects"
      //       //   }
      //       // ]
      //     },
      //     {
      //       path: "/account/settings",
      //       name: "settings",
      //       component: "./Account/Settings/Info",
      //       hideInMenu: true,
      //       routes: [
      //         {
      //           path: "/account/settings",
      //           redirect: "/account/settings/base"
      //         },
      //         {
      //           path: "/account/settings/base",
      //           component: "./Account/Settings/BaseView"
      //         },
      //         {
      //           path: "/account/settings/security",
      //           component: "./Account/Settings/SecurityView"
      //         },
      //         {
      //           path: "/account/settings/binding",
      //           component: "./Account/Settings/BindingView"
      //         },
      //         {
      //           path: "/account/settings/notification",
      //           component: "./Account/Settings/NotificationView"
      //         }
      //       ]
      //     }
      //   ]
      // },
      // userpage
      /*{ path: "/", redirect: "/userpage/information" },
      {
        path: "/userpage",
        icon: "team",
        name: "userpage",
        routes: [
          {
            path: "/userpage/information",
            name: "information",
            component: "./UserPage/Information"
          }
        ]
      },*/

      // list
      {
        path: "/list",
        icon: "file-text",
        name: "list",
        routes: [
          {
            path: "/list/basic-list",
            name: "basiclist",
            component: "./List/BasicList"
          },
          {
            path:"/list/adding-list",
            name: "addinglist",
            component: "./List/AddText",
            hideInMenu: true
          },
          {
            path: "/list/adding-list/:aid",
            name: "addinglist",
            component: "./List/Adding",
            hideInMenu: true
          }
        ]
      },

      // post
      {
        path: "/post",
        icon: "picture",
        name: "post",
        routes: [
          {
            path: "/post/dynamic-post",
            name: "dynamicpost",
            component: "./Post/DynamicPost"
          }
        ]
      },

      // profile
      {
        path: "/profile",
        name: "profile",
        icon: "audit",
        routes: [
          {
            path: "/profile/basic",
            name: "basic",
            component: "./Profile/BasicProfile"
          }
        ]
      },

      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           name: 'stepform',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },

      // // result
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },

      // // exception
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      {
        component: "404"
      }
    ]
  }
];
