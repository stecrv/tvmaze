<template>
  <main class="container">
    <h1>Movie list</h1>
    <section class="movie-list" >
      <movie-list
          v-for="genre in genres"
          :selectedGenres="genre"
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
.container{
 padding: 10px;
  margin: 10px;
}
</style>