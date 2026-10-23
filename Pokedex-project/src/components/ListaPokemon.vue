<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import PokemonCard from './PokemonCard.vue'

interface Pokemon {
    name: string
    url: string
}

const pokemons = ref<Pokemon[]>([])
const search = ref('')
const loading = ref(true)
const error = ref('')
const filteredPokemons = computed(() => {
    const query = search.value.trim().toLowerCase()
    return pokemons.value.filter((pokemon) =>
        `${pokemon.name} ${getPokemonNumber(pokemon.url)}`.includes(query),
    )
})

function getPokemonNumber(url: string) {
    return url.split('/').filter(Boolean).pop()?.padStart(3, '0') ?? '000'
}

onMounted(async () => {
    const service = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/pokemon',
    })

    try {
        const { data } = await service.get<{ results: Pokemon[] }>('?limit=151')
        pokemons.value = data.results
    } catch {
        error.value = 'Não foi possível carregar os Pokémon.'
    } finally {
        loading.value = false
    }
})
</script>
<template>
    <main class="pokedex-page">
        <section class="collection-heading" aria-labelledby="page-title">
            <div>
                <p class="eyebrow">Kanto · primeira geração</p>
                <h1 id="page-title">Pokédex</h1>
        
            </div>
            <p class="collection-count"><strong>{{ pokemons.length }}</strong> Pokémon</p>
        </section>

        <label class="search-field">
            <div class="search-icon" aria-hidden="true"></div>
            <div class="visually-hidden">Buscar Pokémon por nome ou número</div>
            <input v-model="search" type="search" placeholder="Buscar Pokémon..." />
        </label>

        <p v-if="loading" class="status-message">Carregando Pokémon...</p>
        <p v-else-if="error" class="status-message error-message">{{ error }}</p>
        <section v-else class="pokemon-grid" aria-label="Pokémon da primeira geração">
            <PokemonCard
                v-for="(item, index) in filteredPokemons"
                :key="item.name"
                :pokemon="item"
                :index="index"
            />
        </section>
    </main>
</template>