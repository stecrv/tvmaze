<template>
  <div>
    <ul>
      <li
          v-for="movie in filteredMovies"
          :key="movie.id">
        <span>{{ movie.name }}</span>
        <div><img :src="movie.image.medium" :alt="movie.name"></div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  selectedGenres: String,
  movies: Array,
});

const filteredMovies = computed(() => {
  return props.selectedGenres.length === 0
      ? props.movies
      : props.movies.filter((movie) =>
          movie.genres.includes(props.selectedGenres)
      );
});
</script>
