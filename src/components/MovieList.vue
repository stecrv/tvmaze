<template>
  <div>
    <ul>
      <li
          v-for="movie in filteredMovies"
          :key="movie.id">
        {{ movie.name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    selectedGenres: String,
    movies: Array,
  },
  computed: {
    filteredMovies() {
      return this.selectedGenres.length === 0
          ? this.movies
          : this.movies.filter((movie) =>
              movie.genres.includes(this.selectedGenres)
          );
    },
  },
};
</script>

