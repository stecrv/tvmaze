<template>
  <div class="movie-list__wrapper" v-if="movies && movies.length>0">
  <h4>{{ selectedGenres ?? title  }}</h4>
  <section class="movie-list__row no-scrollbar">
    <article class="movie-list__element "
             v-for="movie in filteredMovies"
             :key="movie.id">
      <div class="movie-list__card__wrapper">
        <figure class="movie-list__card-figure">
            <img v-if="movie.image?.original" :src="movie.image.original" :alt="movie.name" class="movie-list__card__image">
            <img v-else-if="movie.image?.medium" :src="movie.image.medium" :alt="movie.name" class="movie-list__card__image">
        </figure>
        <div class="movie-list__card__content">
          <div class="movie-list__card__heading movie-list__info">
            <h4>
              {{ movie.name }}
            </h4>
          </div>
          <div v-if="movie.summary">
            <div v-html="`${movie.summary.substring(0, 160)}...`" class="movie-list__card__description movie-list__info"></div>
          </div>
          <div class="movie-list__cta button button-primary movie-list__info">
            <a :href="'/movie/'+movie.id" class="read-more">
              Read more <span class="sr-only">about this</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  </section>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps({
  selectedGenres: String,
  title: String,
  movies: Array,
});

const filteredMovies = computed(() => {
  return props.selectedGenres && props.selectedGenres.length > 0
      ? (props.movies.filter((movie) =>
          movie.genres.includes(props.selectedGenres)))
      : (props.movies)
  });
</script>

<style scoped>
:root {
  --gutter: 20px;
}

.movie-list__element {
  --img-scale: 1.001;
  --title-color: black;
  --link-icon-translate: 40px;
  --link-icon-opacity: 1;
  position: relative;
  border-radius: 16px;
  box-shadow: none;
  background: #fff;
  transform-origin: center;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}

.movie-list__element h2 {
  transition: color 0.3s ease-out;
}

.movie-list__card-figure {
  margin: 0;
  padding: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.movie-list__card__heading {
  white-space: nowrap;
}

.movie-list__element img {
  max-width: 100%;
  transform-origin: center;
  transform: scale(var(--img-scale));
  transition: transform 0.4s ease-in-out;
}

.movie-list__card__content {
  padding: 24px;
}

.movie-list__element a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.movie-list__element a:focus {
}

.movie-list__element a .icon {
  min-width: 24px;
  width: 24px;
  height: 24px;
  margin-left: 5px;
  transform: translateX(var(--link-icon-translate));
  opacity: var(--link-icon-opacity);
  transition: all 0.3s;
}

.movie-list__element:has(:hover, :focus) {
  --img-scale: 1.1;
  --link-icon-translate: 0;
  --link-icon-opacity: 1;
}

.movie-list__row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  grid-template-rows: 500px;
  grid-auto-flow: column;
  gap: 24px;
  margin-inline: auto;
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(.75 * var(--gutter));
  margin-bottom: calc(-.25 * var(--gutter));
}

.movie-list__wrapper{
  margin-top: 30px;
  width: 1000vw;
}

.movie-list__card__description{
}

.movie-list__card__content {
  display: grid;
  grid-template-rows: [title] 50px [content] 200px [cta] 50px;
}

.movie-list__info{
  width: 200px;
}

@media screen and (max-width: 960px) {

  .movie-list__row {
    grid-template-rows: auto;
  }

  .movie-list__card__description {
    display: none;
  }

  .movie-list__card__content {
    display: grid;
    grid-template-rows: [title] 75px [content] 0px [cta] 50px;
  }
}



.read-more{
  color: #fff
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.no-scrollbar {
  scrollbar-width: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

</style>
