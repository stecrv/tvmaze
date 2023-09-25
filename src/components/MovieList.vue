<template>
  <div class="movie-wrapper">
  <h2 v-if="filteredMovies.length>0">{{ selectedGenres }}</h2>
  <section class="movie-container articles">
    <article class="movie-element"
             v-for="movie in filteredMovies"
             :key="movie.id">
      <div class="movie-card__wrapper article-wrapper">
        <figure class="movie-card__figure">
            <img :src="movie.image.original" :alt="movie.name" class="movie-card__image">
        </figure>
        <div class="movie-card__content article-body">
          <h2 class="movie-card__heading">
            {{ movie.name }}
          </h2>
          <p v-html="movie.abstract" class="movie-card__description"></p>
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
    </article>
  </section>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue';

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
:root {
  --gutter: 20px;
}

.movie-element {
  --img-scale: 1.001;
  --title-color: black;
  --link-icon-translate: -20px;
  --link-icon-opacity: 0;
  position: relative;
  border-radius: 16px;
  box-shadow: none;
  background: #fff;
  transform-origin: center;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}

.movie-element h2 {
  margin: 0 0 18px 0;
  font-family: "Bebas Neue", cursive;
  font-size: 1.9rem;
  letter-spacing: 0.06em;
  color: var(--title-color);
  transition: color 0.3s ease-out;
}

.movie-card__figure {
  margin: 0;
  padding: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.movie-element img {
  max-width: 100%;
  transform-origin: center;
  transform: scale(var(--img-scale));
  transition: transform 0.4s ease-in-out;
}

.article-body {
  padding: 24px;
}

.movie-element a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #28666e;
}

.movie-element a:focus {
  outline: 1px dotted #28666e;
}

.movie-element a .icon {
  min-width: 24px;
  width: 24px;
  height: 24px;
  margin-left: 5px;
  transform: translateX(var(--link-icon-translate));
  opacity: var(--link-icon-opacity);
  transition: all 0.3s;
}

.movie-element:has(:hover, :focus) {
  --img-scale: 1.1;
  --title-color: #28666e;
  --link-icon-translate: 0;
  --link-icon-opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.movie-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  grid-auto-flow: column;
  gap: 24px;
  margin-inline: auto;
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(.75 * var(--gutter));
  margin-bottom: calc(-.25 * var(--gutter));
}

.movie-wrapper{
  width: 1000vw;
}

@media screen and (max-width: 960px) {
  .movie-element {
    container: card/inline-size;
  }

  .article-body p {
    display: none;
  }
}

@container card (min-width: 380px) {
  .article-wrapper {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 16px;
  }

  .article-body {
    padding-left: 0;
  }

  .movie-card__figure {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .movie-card__figure img {
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
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

</style>
