<template>
  <ul class="movie-container">
    <li class="movie-element"
        v-for="movie in filteredMovies"
        :key="movie.id">
      <figure class="movie-card">
          <div class="movie-card__hero">
            <img :src="movie.image.medium" :alt="movie.name" class="movie-card__image" >
          </div>
          <div class="movie-card__content">
            <h2 class="movie-card__heading">
              {{ movie.name }}
            </h2>
            <div class="movie-card__title">
              <div
                  v-for="genre in movie.genres"
                  class="movie-card__tag">
                {{genre}}
              </div>
            </div>
            <div v-html="movie.summary" class="movie-card__description"></div>
          </div>
      </figure>
    </li>
  </ul>
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

<style scoped>

.movie-container{
  display: flex;
  flex-direction: row;
}

.movie-element{

}

.movie-card {
  max-width: 800px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.movie-card__hero {
  flex: 0 0 45%;
}

.movie-card__image {
  width: 100%;
  display: block;
}

.movie-card__content {
  background-color: #fff;
  flex: 1;
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
}

.movie-card__title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.movie-card__heading {
  font-size: 16px;
  margin-right: auto;
  color: royalblue;
}

.movie-card__tag {
  font-size: 10px;
  color: #fff;
  padding: 2px 7px;
  border-radius: 100px;
  margin-right: 8px;
  display: block;
  text-transform: uppercase;
}

.movie-card__tag {
  background-color: #A9C9FF;
}

.movie-card__description {
  font-size: 14px;
}

</style>
