import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Projeto',
      name: 'Projeto',
      component: () => import('../views/Projeto.vue')
    },
    {
      path: '/CriarConta',
      name: 'CriarConta',
      component: () => import('../views/CriarConta.vue')
    },
    {
      path: '/VizualizarProvas',
      name: 'VizualizarProvas',
      component: () => import('../views/VizualizarProvas.vue')
    },
    {
      path: '/InformarProva',
      name: 'InformarProva',
      component: () => import('../views/InformarProva.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == undefined) {
    router.push('/Login')
  }

  document.title = to.name
  next()
})

export default router
