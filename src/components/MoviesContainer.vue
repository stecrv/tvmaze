<!-- MovieList.vue -->
<template>
  <div class="container">
    <h1>Movie search</h1>
    <div v-if="loading.value">
      Loading data..
    </div>
    <div v-else-if="showError">
      Sorry, the app is not working, reload the page
    </div>
    <div v-else>
    <SearchInput :searchQuery="searchQuery"
                 @update:searchQuery="updateSearchQuery"/>
    <MovieList :movies="moviesFiltered"
               v-for="genre in genres"
               :selectedGenres="genre"
               />
    </div>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, computed, watch} from 'vue';
import SearchInput from './SearchInput.vue';
import MovieList from "./MovieList.vue";
import { dataFetch } from "../helpers/api.js";
import { dataEnricher } from "../helpers/functions.js";

const movies = ref([]);
const moviesFiltered = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const showError =  ref(false);

onBeforeMount(async () => {
  loading.value=true;
  try {
    const data = await dataFetch()
    movies.value = moviesFiltered.value = dataEnricher(data)
    loading.value=false;
  }catch(error){
    showError.value=true;
    loading.value=false;
  }
});

const genres = computed(() => {
  const allGenres = movies.value.flatMap((movie) => movie.genres);
  return [...new Set(allGenres)].sort();
});

const updateSearchQuery = (newSearchQuery) => {
  searchQuery.value = newSearchQuery;
};

watch(searchQuery, () => {
  searchQuery.value ?
    moviesFiltered.value = movies.value.filter(movie => {
      return movie.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    })
  : moviesFiltered.value = movies.value

});
</script>

<style scoped>
.container{
 padding: 10px;
  margin: 10px;
}
</style>