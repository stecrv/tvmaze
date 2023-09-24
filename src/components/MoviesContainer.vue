<!-- MovieList.vue -->
<template>
  <div class="container">
    <h1>Movie search</h1>
    <SearchInput :searchQuery="searchQuery"
                 @update:searchQuery="updateSearchQuery"/>
    <MovieList :movies="moviesFiltered"
               v-for="genre in genres"
               :selectedGenres="genre"
               />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import SearchInput from './SearchInput.vue';
import MovieList from "./MovieList.vue";

const movies = ref([]);
const moviesFiltered = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  movies.value = moviesFiltered.value = data.map(el => {
    return {...el, abstract: el.summary.substring(0, 200) + "..."}});
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