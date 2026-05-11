<template>
  <div v-if="showBanner" class="fixed inset-x-0 bottom-0 z-[60]">
    <div class="max-w-6xl mx-auto px-6 pb-6">
      <div class="bg-ink text-white rounded-2xl p-6 shadow-2xl">
        <p class="text-sm leading-relaxed mb-4">
          Ce site utilise Google Analytics pour améliorer votre expérience.
          En acceptant, vous autorisez le dépôt de cookies analytiques.
          <a
            href="/politique-de-confidentialite"
            class="underline underline-offset-2 text-white hover:text-white/80 transition-colors"
          >
            En savoir plus
          </a>
        </p>
        <div class="flex flex-wrap gap-3">
          <button
            @click="accept"
            class="btn-shine bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-dark transition-colors"
          >
            Accepter
          </button>
          <button
            @click="refuse"
            class="text-sm font-semibold px-5 py-2.5 rounded-full border-[1.5px] border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  </div>

  <button
    v-if="!showBanner && hasChosen"
    @click="openBanner"
    class="fixed bottom-4 right-4 z-50 bg-surface text-ink-light text-xs font-medium px-3 py-2 rounded-full border border-border hover:bg-surface-2 hover:text-ink transition-colors shadow-sm"
  >
    Gérer les cookies
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const STORAGE_KEY = "cookie_consent";
const showBanner = ref(false);
const hasChosen = ref(false);

onMounted(() => {
  const consent = localStorage.getItem(STORAGE_KEY);
  if (!consent) {
    showBanner.value = true;
  } else {
    hasChosen.value = true;
  }
});

function accept() {
  localStorage.setItem(STORAGE_KEY, "accepted");
  showBanner.value = false;
  hasChosen.value = true;
  window.location.reload();
}

function refuse() {
  localStorage.setItem(STORAGE_KEY, "refused");
  showBanner.value = false;
  hasChosen.value = true;
}

function openBanner() {
  showBanner.value = true;
}
</script>