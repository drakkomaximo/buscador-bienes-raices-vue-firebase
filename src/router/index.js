import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propiedad/:id',
      name: 'propiedad',
      component: () => import('@/views/PropiedadView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'propiedades',
          name: 'admin-propiedades',
          component: () => import('@/views/admin/AdminView.vue')
        },
        {
          path: 'nueva',
          name: 'nueva-propiedad',
          component: () => import('@/views/admin/NuevaPropiedadView.vue')
        },
        {
          path: 'editar/:id',
          name: 'editar-propiedad',
          component: () => import('@/views/admin/EditarPropiedadView.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requeresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requeresAuth) {
    try {
      await authenticateUser()
      next()
    } catch (error) {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth()
  return new Promise((resolve, reject) => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {

      unsubcribe()
      if (user) {
        resolve(user)
      } else {
        reject(new Error('User not authenticated'))
      }
    })
  })
}

export default router
