// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/components/ProductList.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import AddProduct from '@/components/AddProduct.vue';
import UpdateProduct from '@/components/UpdateProduct.vue';

// Views
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import Product from '@/views/Product.vue';
import ProductAdd from '@/views/ProductAdd.vue';
import ProductUpdate from '@/views/ProductUpdate.vue';

const routes = [
  {
    path: '/productlist',
    component: ProductList,
    name: 'ProductList'
  },
  {
    path: '/productdetail/:id',
    component: ProductDetail,
    name: 'ProductDetail'
  },
  {
    path: '/add-product',
    component: AddProduct,
    name: 'AddProduct'
  },
  {
    path: '/update/:id',
    component: UpdateProduct,
    name: 'UpdateProduct'
  },

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
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
