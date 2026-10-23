<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<div class="app-shell">
		<header class="topbar">
			<RouterLink class="brand" to="/">
				<div class="brand-mark" aria-hidden="true"></div>
				<div>Pokédex<div class="brand-period">.</div></div>
			</RouterLink>
			<div class="topbar-actions">
				<div class="edition-label">National Pokédex</div>
				<nav aria-label="Navegação principal">
					<RouterLink to="/">Explorar</RouterLink>
					<RouterLink to="/login">Treinador</RouterLink>
				</nav>
			</div>
		</header>
		<RouterView />
		<div class="site-footer">
			<div>Feita para quem completa a coleção.</div>
			<div>Kanto · Nº 001—151</div>
		</div>
	</div>
</template>
