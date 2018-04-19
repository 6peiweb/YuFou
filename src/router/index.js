import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register/Register.vue';
Vue.use(Router);
var routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];
export default new Router({
    routes: routes
});
//# sourceMappingURL=index.js.map