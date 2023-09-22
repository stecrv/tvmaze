<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    genres: Array,
    selectedGenre: String,
  },
  methods: {
    updateGenre(event) {
      this.$emit('update:selectedGenre', event.target.value);
    },
  },
};
</script>
