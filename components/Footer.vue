<template>
  <section class="my-footer">
    <!-- Вставляем SVG спрайт один раз -->
    <svg xmlns="http://www.w3.org/2000/svg" class="d-none" style="display:none;">
      <symbol id="python" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M14 4.5V14a2 2 0 0 1-2 2H7v-1h5a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM0 11.85h1.6c.289 0 .533.06.732.179.201.117.355.276.46.477.105.201.158.427.158.677 0 .25-.054.476-.16.677-.106.199-.26.357-.464.474a1.452 1.452 0 0 1-.732.173H.79v1.342H0V11.85Zm2.06 1.714a.795.795 0 0 0 .085-.381c0-.227-.062-.4-.185-.521-.123-.122-.294-.182-.513-.182H.788v1.406h.66a.794.794 0 0 0 .374-.082.574.574 0 0 0 .238-.24Zm2.963.75v1.535H4.23v-1.52L2.89 11.85h.876l.853 1.696h.032l.856-1.696h.855l-1.339 2.464Z" />
      </symbol>
      <symbol id="telegram" viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
      </symbol>
    </svg>

    <div class="container">
      <div class="row">
        <div class="col-lg-9 col-sm-12 my-3">
          <NuxtLink to="/" class="text-body-secondary text-decoration-none lh-1">
            <svg class="bi" width="30" height="24" aria-hidden="true" focusable="false">
              <use xlink:href="#python" />
            </svg>
          </NuxtLink>
          <span class="text-body-secondary">&copy; 2023 Агентство по разработке потрясных сайтов. А это просто блог-форум :).</span>
        </div>
        <div class="col-lg-3 col-sm-12 my-3 d-flex justify-content-end">
          <ul class="nav list-unstyled">
            <li>
              <a class="text-body-secondary" href="https://t.me/Vitaliy_Khomenko" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <svg class="bi" width="24" height="24" aria-hidden="true" focusable="false">
                  <use xlink:href="#telegram" />
                </svg>
              </a>
            </li>
            <li class="ms-2">
              <a class="text-end" href="#" @click.prevent="scrollToTop">Наверх</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>


</style>