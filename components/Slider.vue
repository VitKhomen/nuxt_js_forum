<template>
    <section class="my-carousel">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="/img/slide_1.jpg" class="d-block w-100" alt="Первая картинка">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Это описание первого слайда</h5>
                    <p>Тут можно писать все что угодно</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/img/slide_2.jpg" class="d-block w-100" alt="Вторая картинка">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Это описание второго слайда</h5>
                    <p>Тут можно писать все что угодно</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="/img/slide_3.jpg" class="d-block w-100" alt="Третья картинка">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Это описание третьего слайда</h5>
                    <p>Тут можно писать все что угодно</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</section>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>