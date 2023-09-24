import { createRouter, createWebHistory } from 'vue-router';
import MoviesContainer from "./components/MoviesContainer.vue";
import MovieDetail from "./components/MovieDetail.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: MoviesContainer,
        props: false,
    },
    {
        path: '/movie/:id',
        name: 'movie-details',
        component: MovieDetail,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
