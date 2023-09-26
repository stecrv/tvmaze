<template>
  <div class="container">
    <h2>Movie Details</h2>
    <div v-if="fetch.load" class="loading-message">
      Loading data..
    </div>
    <div v-else-if="fetch.error" class="error-message">
      Sorry, the app is not working, reload the page
    </div>
    <div v-else>
      <div class="movie-details__content">
        <h3>{{ fetch.data.name }}</h3>
        <img :src="fetch.data.image.medium" :alt="fetch.data.name" />
        <p v-html="fetch.data.summary" />
      </div>
    </div>
    <div>
      <a @click="$router.go(-1)">
        Back
      </a>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from "../composables/useFetch.js";


const route = useRoute();

const movieId = computed(() => route.params.id);

const fetch = reactive(useFetch(`shows/${movieId.value}`));

</script>

<style scoped>
.container{
  padding: 10px;
  margin: 10px;
}
</style>