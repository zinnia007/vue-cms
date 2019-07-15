const home = () => import(/* webpackChunkName: "home" */ '@/home.vue')

let dynamicRoutes = [
  [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/imgList',
          name: '图片列表',
          component: () => import(/* webpackChunkName: "imgList" */ '@/views/imgList.vue'),
          meta: {
            keepAlive: true,
            path: '/imgList'
          }
        },
        {
          path: '/imgUpload',
          name: '图片上传',
          component: () => import(/* webpackChunkName: "imgUpload" */ '@/views/imgUpload.vue'),
          meta: {
            path: '/imgList'
          }
        }
      ]
    }
  ],
  [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/*',
          name: '文件找不到',
          component: () => import(/* webpackChunkName: "notFoundComponent" */ '@/views/notFoundComponent.vue')
        }
      ]
    }
  ]
]
export default dynamicRoutes