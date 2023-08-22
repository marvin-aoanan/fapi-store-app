import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// Views
const Home = () => import('@/views/Home.vue');
const Products = () => import('@/views/Products.vue');
const Product = () => import('@/views/Product.vue');
const ProductAdd = () => import('@/views/ProductAdd.vue');
const ProductUpdate = () => import('@/views/ProductUpdate.vue');
const UnauthorizedAccess = () => import('@/views/protected/UnauthorizedAccess.vue');
const ProtectedProducts = () => import('@/views/protected/ProtectedProducts.vue');

const BASE_ROUTES = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/products', component: Products, name: 'Products' },
  { path: '/product/:id', component: Product, name: 'Product' },
  { path: '/product/add', component: ProductAdd, name: 'ProductAdd' },
  { path: '/product/update/:id', component: ProductUpdate, name: 'ProductUpdate' },
  // ... other non-restricted routes
];

const PROTECTED_ROUTES = [
  { path: '/protected', component: ProtectedProducts, name: 'ProtectedProducts', meta: { requiresAuth: true } },
  // ... other restricted routes
];

const LOGIN_ROUTE = { path: '/login', component: Home, name: 'Login', meta: { authenticated: true } };
const LOGOUT_ROUTE = { path: '/logout', component: Home, name: 'Logout' };
const UNAUTHORIZED_ROUTE = { path: '/unauthorized', component: UnauthorizedAccess, name: 'UnauthorizedAccess' };

const routes = [...BASE_ROUTES, LOGIN_ROUTE, LOGOUT_ROUTE, UNAUTHORIZED_ROUTE, ...PROTECTED_ROUTES];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const authenticated = to.matched.some(record => record.meta.authenticated);

  if (requiresAuth && !store.state.user.accessToken) {
    next({ name: 'UnauthorizedAccess' });
  } else if (authenticated && store.state.user.accessToken) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
