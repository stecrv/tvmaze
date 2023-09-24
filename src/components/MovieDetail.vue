<template>
  <div class="container">
    <h2>Movie Details</h2>
    <div v-if="loading.value">
      Loading data..
    </div>
    <div v-else-if="showError">
      Sorry, the app is not working, reload the page
    </div>
    <div v-else>
      <div class="movie-details">
        <h3>{{ movie.name }}</h3>
        <img :src="movie.image.medium" :alt="movie.name" />
        <p v-html="movie.summary" />
      </div>
    </div>
    <div>
      <a @click="$router.go(-1)">back</a>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onBeforeMount} from 'vue';
import { useRoute } from 'vue-router';
import { dataMovieFetch } from "../helpers/api.js";


const route = useRoute();

const movie = ref(null);
const loading = ref(false);
const showError = ref(false);

const movieId = computed(() => route.params.id);

onBeforeMount(async () => {
  loading.value=true;
  try {
    const data = await dataMovieFetch(movieId.value)
    movie.value = data;
    loading.value=false;
  }catch(error){
    showError.value=true;
    loading.value=false;
  }
});

</script>

<style scoped>
.container{
  padding: 10px;
  margin: 10px;
}
</style>