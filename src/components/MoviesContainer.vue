<!-- MovieList.vue -->
<template>
  <div class="container-list">
    <h1>MovieFinder</h1>
    <div v-if="fetchMostWatched.load || fetchSearch.load">
      Loading data..
    </div>
    <div v-else-if="fetchMostWatched.error || fetchSearch.error">
      Sorry, the app is not working, reload the page
    </div>
    <div v-else>
      <div class="search-bar">
        <div class="search-bar__item">
          <SearchInput :searchQuery="searchQuery"
                       @update:searchQuery="updateSearchQuery"/>
        </div>
        <div v-if="!searchQuery" class="search-bar__item">
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
        <div v-if="searchQuery">
          <MovieList :movies="moviesFiltered"
                     title="Search result"
          />
        </div>
        <div v-else-if="!selectedGenres & !searchQuery">
          <MovieList :movies="moviesFiltered"
                     v-for="genre in genres"
                     :selectedGenres="genre"
          />
        </div>
        <div v-else>
          <MovieList :movies="moviesFiltered"
                     :selectedGenres="selectedGenres"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue';
import SearchInput from './SearchInput.vue';
import MovieList from "./MovieList.vue";
import GenreSelector from "./GenreSelector.vue";
import { searchDataConvert } from "../helpers/functions.js";
import { useFetch } from "../composables/useFetch.js";

const searchQuery = ref('');
const selectedGenres = ref('');
const searchUrl = ref('shows');
const fetchMostWatched = reactive(useFetch('shows'));
const fetchSearch = reactive({data:[], error:false, load:false});

// most watched movie, load once
const movies = computed(() => {
  return fetchMostWatched.data ? (fetchMostWatched.data) : []
});

// search movie result, load on query search
const moviesSearch = computed(() => {
  return fetchSearch.data ? searchDataConvert(fetchSearch.data) : []
});

const genres = computed(() => {
  const allGenres = movies.value.flatMap((movie) => movie.genres);
  return [...new Set(allGenres)].sort();
});

const moviesFiltered = computed(() => {
  return searchQuery.value? moviesSearch.value :  movies.value;
});

const updateSearchQuery = (newSearchQuery) => {
  searchQuery.value = newSearchQuery;
};

watch(searchQuery, (newQuery) => {
  searchUrl.value = newQuery ? `search/shows?q=${newQuery}` : 'shows';
});

watch(searchUrl, (newUrl) => {
  Object.assign(fetchSearch, useFetch(newUrl));
});

</script>

<style scoped>
.container-list {
  padding: 10px;
  margin: 10px;
}

.search-bar {
  display: flex;
  flex-direction: row;
  gap: 0 10px
}

.result-empty {
  margin: 10px 0;
}

</style>