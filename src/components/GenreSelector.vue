<template>
    <select
        :value="selectedGenre"
        @change="updateGenre">
      <option value="">
        All
      </option>
      <option
          v-for="genre in genres"
          :key="genre">
        {{ genre }}
      </option>
    </select>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  genres: Array,
  selectedGenre: String,
});

const emit = defineEmits();

const selectedGenre = ref(props.selectedGenre);

const updateGenre = (event) => {
  selectedGenre.value = event.target.value;
  emit('update:selectedGenre', selectedGenre.value);
};

watch(() => props.selectedGenre, (newGenre) => {
  selectedGenre.value = newGenre;
});
</script>

<style scoped>

</style>