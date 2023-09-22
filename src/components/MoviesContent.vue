<template>
  <div>
    <genre-filter
        :genres="genres"
        :selected-genre="selectedGenres"
        @update:selectedGenre="selectedGenres = $event" />
    <movie-list
        :selectedGenres="selectedGenres"
        :movies="movies" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import GenreFilter from './GenreFilter.vue';
import MovieList from './MovieList.vue';

export default {
  components: {
    GenreFilter,
    MovieList,
  },
  setup() {
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

    return {
      genres,
      selectedGenres,
      movies,
    };
  },
};
</script>
