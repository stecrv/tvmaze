import MovieDetails from '../components/MovieDetail.vue';

import { createRouter, createMemoryHistory } from 'vue-router';
import {shallowMount} from "@vue/test-utils";

const mockRoute = {
    params: {
        id: '2',
    },
};

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: {
                template: '<div></div>',
            },
        },
        {
            path: '/movie/:id',
            name: 'movie-detail',
            component: {
                template: '<div></div>',
            },
        },
    ],
});

describe('MovieDetails', async() => {
    it('should render the loading state when the fetch is loading', async () => {
        router.push({
            name: 'movie-detail',
            params: mockRoute.params,
        });

        const wrapper = shallowMount(MovieDetails, {
            global: {
                plugins: [router],
            },
        });

        // Wait for Vue to update the DOM
        await wrapper.vm.$nextTick();

        // Your test assertions
        expect(wrapper.find('.container > h2').text()).toContain('Movie Details');
        expect(wrapper.find('.container > .loading-message').text()).toContain('Loading data..');
    });

});