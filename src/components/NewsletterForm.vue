<template>
  <div v-if="sent" class="text-center py-8 animate-scale-in">
    <div class="text-4xl mb-3">✓</div>
    <div class="font-pronell text-2xl text-brand mb-2">Bienvenue !</div>
    <p class="text-sm text-ink-faint">
      Vous recevrez prochainement la Lettre Psy.
    </p>
  </div>
  <div v-else class="flex flex-col gap-3">
    <input
      type="email"
      placeholder="votre@email.fr"
      v-model="email"
      :class="[
        'w-full text-sm px-4 py-3 border rounded-xl text-ink outline-none transition-colors duration-200',
        error ? 'border-red-500' : 'border-border focus:border-brand',
      ]"
    />
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    <button
      @click="subscribe"
      class="btn-shine w-full text-base font-semibold py-3 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors duration-200"
    >
      S'abonner gratuitement →
    </button>
    <p class="text-xs text-ink-faint text-center leading-relaxed">
      Votre email ne sera jamais transmis à des tiers. Désinscription possible à
      tout moment.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ count: string }>();

const email = ref("");
const sent = ref(false);
const error = ref("");

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function subscribe() {
  error.value = "";
  if (!email.value) {
    error.value = "Veuillez saisir votre adresse email.";
    return;
  }
  if (!isValidEmail(email.value)) {
    error.value = "Veuillez saisir une adresse email valide.";
    return;
  }
  sent.value = true;
}
</script>
