<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

interface PokemonDetailData {
  id: number
  name: string
  height: number
  weight: number
  types: { type: { name: string } }[]
  sprites: {
    front_default: string | null
  }
}

const route = useRoute()
const pokemon = ref<PokemonDetailData | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get<PokemonDetailData>(
      `https://pokeapi.co/api/v2/pokemon/${route.params.id}`,
    )
    pokemon.value = data
  } catch {
    error.value = 'Não foi possível encontrar esse Pokémon.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="pokemon-detail-page">
    <RouterLink class="back-link" to="/">← Voltar à Pokédex</RouterLink>
    <p v-if="loading" class="status-message">Carregando Pokémon...</p>
    <p v-else-if="error" class="status-message error-message">{{ error }}</p>
    <section v-else-if="pokemon" class="pokemon-detail">
      <div class="detail-artwork">
        <div>#{{ String(pokemon.id).padStart(3, '0') }}</div>
        <img
          :src="pokemon.sprites.front_default ?? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
          :alt="pokemon.name"
        />
      </div>
      <div class="detail-copy">
        <p class="eyebrow">Pokémon · Nº {{ String(pokemon.id).padStart(3, '0') }}</p>
        <h1>{{ pokemon.name }}</h1>
        <div class="type-list" aria-label="Tipos">
          <div v-for="item in pokemon.types" :key="item.type.name" class="type-label">
            {{ item.type.name }}
          </div>
        </div>
        <dl class="detail-stats">
          <div>
            <dt>Altura</dt>
            <dd>{{ (pokemon.height / 10).toFixed(1) }} m</dd>
          </div>
          <div>
            <dt>Peso</dt>
            <dd>{{ (pokemon.weight / 10).toFixed(1) }} kg</dd>
          </div>
        </dl>
      </div>
    </section>
  </main>
</template>
