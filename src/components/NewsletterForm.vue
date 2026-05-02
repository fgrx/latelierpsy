<template>
  <div v-if="sent" class="text-center py-8 animate-scale-in">
    <div class="text-4xl mb-3">✓</div>
    <div class="font-pronell text-2xl text-brand mb-2">Bienvenue !</div>
    <p class="text-sm text-ink-faint">Confirmez votre inscription dans votre boîte mail.</p>
  </div>
  <div v-else class="flex flex-col gap-3">
    <input
      type="email"
      placeholder="votre@email.fr"
      v-model="email"
      class="w-full text-sm px-4 py-3 border border-border rounded-xl text-ink outline-none focus:border-brand transition-colors duration-200"
    />
    <button
      @click="subscribe"
      class="btn-shine w-full text-base font-semibold py-3 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors duration-200"
    >
      S'abonner gratuitement →
    </button>
    <p class="text-xs text-ink-faint text-center leading-relaxed">
      Rejoignez les 19 970 inscrits. Désinscription possible à tout moment.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const sent = ref(false);

function subscribe() {
  if (email.value) {
    sent.value = true;
  }
}
</script>
