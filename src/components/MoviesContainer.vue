<template>
  <main id="container">
    <section id="genre-selector" >
      <h1>Movie Selector</h1>
      <genre-selector
          :genres="genres"
          :selected-genre="selectedGenres"
          @update:selectedGenre="selectedGenres = $event" />
    </section>
    <section id="movie-list" >
      <movie-list
          :selectedGenres="selectedGenres"
          :movies="movies" />
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import GenreSelector from './GenreSelector.vue';
import MovieList from './MovieList.vue';

const movies = ref([]);
const selectedGenres = ref('');

onMounted(async () => {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  movies.value = data;
});

const genres = computed(() => {
  const allGenres = movies.value.flatMap((movie) => movie.genres);
  return [...new Set(allGenres)].sort();
});
</script>

<style scoped>
#genre-selector {
  font-size: 1.2em;
  padding: 1em 3em;
  height: 20vh;
}

#genre-selector  h1 {
  font-size: 1em;
  font-weight: normal;
}
</style>