<!-- Search.vue -->
<template>
  <input type="search" v-bind:value="searchQuery" v-on:input="updateSearchQuery" placeholder="Search by title">
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  searchQuery: String,
});

const emit = defineEmits();

const updateSearchQuery = (event) => {
  emit('update:searchQuery', event.target.value);
};
</script>
