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
      <a @click="$router.go(-1)">
        Back
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"/>
        </svg>
      </a>
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