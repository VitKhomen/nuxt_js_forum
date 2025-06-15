<template>
  <section class="my-carousel">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="carousel-caption d-none d-md-block">
            <h1>{{ title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Заголовок по умолчанию'
  }
})
</script>

<style scoped>
.my-carousel {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  background-color: #343a40;
}
.carousel-item {
    height: 15rem; /* или auto, или max-height */
    text-align: center; /* если нужно центрировать */
}
</style>


