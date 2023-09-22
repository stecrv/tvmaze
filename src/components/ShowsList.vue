<template>
  <div>
    <select v-model="selectedGenre">
      <option value="">All</option>
      <option value="Action">Action</option>
      <option value="Comedy">Comedy</option>
      <option value="Drama">Drama</option>
    </select>

    <ul>
      <li v-for="movie in filteredMovies" :key="movie.id">
        {{ movie.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, onMounted, watch} from 'vue';

export default {
  setup() {
    const movies = ref([]);
    const selectedGenre = ref('');
    const filteredMovies = ref([]);

    onMounted(async () => {
      // Fetch the movies from the API
      const response = await fetch('https://api.tvmaze.com/shows');
      const data = await response.json();

      movies.value = data;
    });

    // Filter the movies based on the selected genre
    watch(selectedGenre, (newGenre) => {
      filteredMovies.value = movies.value.filter(movie => {
        console.log('///////movie',movie);

        return movie.genres.includes(newGenre);
      });
    });

    return {
      movies,
      selectedGenre,
      filteredMovies,
    };
  },
};
</script>
