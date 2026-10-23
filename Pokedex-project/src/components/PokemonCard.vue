<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  pokemon: { name: string; url: string }
  index: number
}>()

const palettes = [
  { surface: '#e6f1e8', accent: '#397654' },
  { surface: '#fff0df', accent: '#c66d37' },
  { surface: '#e7edf7', accent: '#4d6e9e' },
  { surface: '#f5e8ea', accent: '#ad5965' },
]

const pokemonId = computed(() => props.pokemon.url.split('/').filter(Boolean).pop() ?? '0')
const cardStyle = computed(() => {
  const palette = palettes[props.index % palettes.length]
  return {
    '--card-surface': palette.surface,
    '--card-accent': palette.accent,
    '--card-delay': `${Math.min(props.index, 12) * 35}ms`,
  }
})
</script>

<template>
  <RouterLink class="pokemon-card" :style="cardStyle" :to="`/pokemon/${pokemonId}`">
    <div class="pokemon-artwork">
      <div class="pokemon-number">#{{ pokemonId.padStart(3, '0') }}</div>
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`"
        :alt="pokemon.name"
        loading="lazy"
      />
    </div>
    <div class="pokemon-info">
      <h2>{{ pokemon.name }}</h2>
      <div class="card-arrow" aria-hidden="true">↗</div>
    </div>
  </RouterLink>
</template>
