<!-- MovieList.vue -->
<template>
  <div class="container">
    <h1>Movie search</h1>
    <div v-if="fetch.load">
      Loading data..
    </div>
    <div v-else-if="fetch.error">
      Sorry, the app is not working, reload the page
    </div>
    <div v-else>
      <div class="search-bar">
        <div class="search-bar__item">
          <SearchInput :searchQuery="searchQuery"
                       @update:searchQuery="updateSearchQuery"/>
        </div>
        <div class="search-bar__item">
          <genre-selector
              :genres="genres"
              :selected-genre="selectedGenres"
              @update:selectedGenre="selectedGenres = $event"/>
        </div>
      </div>
      <div class="result-container">
        <div v-if="moviesFiltered.length===0">
          <div class="result-empty">Sorry, no movies available.</div>
        </div>
        <MovieList :movies="moviesFiltered"
                   v-if="!selectedGenres"
                   v-for="genre in genres"
                   :selectedGenres="genre"
        />
        <MovieList :movies="moviesFiltered"
                   v-else
                   :selectedGenres="selectedGenres"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch, reactive} from 'vue';
import SearchInput from './SearchInput.vue';
import MovieList from "./MovieList.vue";
import GenreSelector from "./GenreSelector.vue";
import {dataEnricher} from "../helpers/functions.js";
import {useFetch} from "../compositions/fetch.js";

const moviesFiltered = ref([]);
const searchQuery = ref('');
const selectedGenres = ref('')

const fetch = reactive(useFetch('shows'));

const movies = computed(() => {
  return fetch.data ? dataEnricher(fetch.data) : []
});

const genres = computed(() => {
  const allGenres = movies.value.flatMap((movie) => movie.genres);
  return [...new Set(allGenres)].sort();
});

const updateSearchQuery = (newSearchQuery) => {
  searchQuery.value = newSearchQuery;
};

watch([searchQuery, movies], () => {
  searchQuery.value ?
      moviesFiltered.value = movies.value.filter(movie => {
        return movie.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      })
      : moviesFiltered.value = movies.value
});

</script>

<style scoped>
.container {
  padding: 10px;
  margin: 10px;
}
.search-bar{
  display: flex;
  flex-direction: row;
  gap: 0 10px
}
.result-empty{
  margin: 10px 0;
}

</style>