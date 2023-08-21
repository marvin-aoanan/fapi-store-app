// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';


// Views
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import Product from '@/views/Product.vue';
import ProductAdd from '@/views/ProductAdd.vue';
import ProductUpdate from '@/views/ProductUpdate.vue';

import UnauthorizedAccess from '@/views/protected/UnauthorizedAccess.vue';
import ProtectedProducts from '@/views/protected/ProtectedProducts.vue';

const routes = [
  // Routes with base layout
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/products',
    component: Products,
    name: 'Products'
  },
  {
    path: '/product/:id',
    component: Product,
    name: 'Product'
  },
  {
    path: '/product/add',
    component: ProductAdd,
    name: 'ProductAdd'
  },
  {
    path: '/product/update/:id',
    component: ProductUpdate,
    name: 'ProductUpdate'
  },
  {
    path: '/login',
    component: Home,
    name: 'Login',
    meta: { authenticated: true }
  },
  {
    path: '/logout',
    component: Home,
    name: 'Logout'
  },
  {
    path: '/unauthorized',
    component: UnauthorizedAccess,
    name: 'UnauthorizedAccess'
  },
  // ... other non restricted routes

  // Restricted routes... 
  {
    path: '/protected',
    component: ProtectedProducts,
    name: 'ProtectedProducts',
    meta: { requiresAuth: true }, // Apply the route guard
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated (has access token)
    if (!store.state.accessToken) {
      // Redirect to login page or handle unauthorized access
      next({ name: 'UnauthorizedAccess' });
    } else {
      // User is authenticated, proceed to the route
      next();
    }
  } else {
    // Route does not require authentication, proceed
    next();
  }
});

export default router;
