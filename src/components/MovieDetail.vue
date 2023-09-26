<template>
  <div class="movie-details__container container">    
    <h1>MovieFinder</h1>
    <div v-if="fetch.load" class="loading-message">
      Loading data..
    </div>
    <div v-else-if="fetch.error" class="error-message">
      Sorry, the app is not working, reload the page
    </div>
    <div v-else>
      <div class="movie-details__content">
        <h3>{{ movie.name }}</h3>
        <div class="movie-details__figure">
          <div class="movie-details__column">
            <img :src="movie.image.medium" :alt="movie.name" />
          </div>
          <div class="movie-details__text">
            <div class="movie-details__info">Year: {{ movie.year }}</div>
            <div class="movie-details__info">Rating: {{ movie.rating.average ?? 'unknow' }}</div>
            <div class="movie-details__info movie-details__button">
              <a :href="movie.url" target="_blank" class="button">
                Website
              </a>
            </div>
          </div>
        </div>
        <div v-html="movie.summary" class="movie-details__summary" />
      </div>
    </div>
    <div>
      <a @click="$router.go(-1)" class="button button-primary">
        Back
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from "../composables/useFetch.js";
import { dataMovieEnricher } from '../helpers/functions' 


const route = useRoute();

const movieId = computed(() => route.params.id);

const fetch = reactive(useFetch(`shows/${movieId.value}`));

const movie = computed(() => {
  return fetch.data ? dataMovieEnricher(fetch.data) : {}
});

</script>

<style scoped>
.movie-details__container{
  margin: 10vh auto 0 auto;
  max-width: 400px;
  position: relative;
  border-radius: 16px;
  background: #fff;
  transform-origin: center;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  padding: 24px;
}
.movie-details__figure{
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.movie-details__info{
  margin-bottom: 0.5rem;
}
.movie-details__summary{
  margin-top: 2.5rem;
}
.movie-details__button{
  margin-top: 1rem;
}


@media (max-width: 550px) {
  .movie-details__container{
    margin-top: 5vh;
    max-width: 90vw;
  }
  .movie-details__figure{
    flex-direction: column; 
    gap: 10px;
  }
}

</style>