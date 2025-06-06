<template>
  <div class="page-wrapper">
    <Navbar />
    <Slider v-if="route.path === '/'"/>
    <main class="main-content container">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from '~/components/Navbar.vue'
import Slider from '~/components/Slider.vue'
import Footer from '~/components/Footer.vue'

const route = useRoute()
</script>

<style>




</style>