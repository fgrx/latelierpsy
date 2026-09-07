<template>
  <div v-if="sent" class="text-center py-8 animate-scale-in">
    <div class="text-4xl mb-3">✓</div>
    <div :class="['font-pronell text-2xl mb-2', isGold ? 'text-gold' : 'text-brand']">Bienvenue !</div>
    <p class="text-sm text-ink-faint">
      {{ successMessage }}
    </p>
  </div>
  <div v-else class="flex flex-col gap-3">
    <input
      type="text"
      placeholder="Votre prénom"
      v-model="name"
      required
      :class="[
        'w-full text-sm px-4 py-3 border rounded-xl text-ink outline-none transition-colors duration-200',
        error ? 'border-red-500' : `border-border ${focusClass}`,
      ]"
    />
    <input
      type="email"
      placeholder="votre@email.fr"
      v-model="email"
      :class="[
        'w-full text-sm px-4 py-3 border rounded-xl text-ink outline-none transition-colors duration-200',
        error ? 'border-red-500' : `border-border ${focusClass}`,
      ]"
    />
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    <button
      @click="subscribe"
      :disabled="loading"
      :class="buttonClass"
    >
      {{ loading ? "Envoi en cours…" : buttonLabel }}
    </button>
    <p class="text-xs text-ink-faint text-center leading-relaxed">
      Votre email ne sera jamais transmis à des tiers. Désinscription possible à
      tout moment.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    count: string;
    campaignId?: string;
    apiUrl: string;
    buttonLabel?: string;
    successMessage?: string;
    variant?: "brand" | "gold";
  }>(),
  {
    campaignId: "qD1uT",
    buttonLabel: "S'abonner gratuitement →",
    successMessage: "Vous recevrez prochainement la Lettre Psy.",
    variant: "brand",
  },
);

const isGold = computed(() => props.variant === "gold");

const focusClass = computed(() =>
  isGold.value ? "focus:border-gold" : "focus:border-brand",
);

const buttonClass = computed(() => [
  "btn-shine w-full text-base font-semibold py-3 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
  isGold.value
    ? "bg-gold text-ink hover:bg-gold/90 shadow-lg shadow-gold/25"
    : "bg-brand text-white hover:bg-brand-dark",
]);

const name = ref("");
const email = ref("");
const sent = ref(false);
const error = ref("");
const loading = ref(false);

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

async function subscribe() {
  error.value = "";
  if (!name.value.trim()) {
    error.value = "Veuillez saisir votre nom ou prénom.";
    return;
  }
  if (!email.value) {
    error.value = "Veuillez saisir votre adresse email.";
    return;
  }
  if (!isValidEmail(email.value)) {
    error.value = "Veuillez saisir une adresse email valide.";
    return;
  }

  loading.value = true;
  try {
    const res = await fetch(props.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        name: name.value.trim(),
        campaignid: props.campaignId,
      }),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de l'inscription.");
    }
    sent.value = true;
  } catch (e: unknown) {
    error.value =
      e instanceof Error
        ? e.message
        : "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    loading.value = false;
  }
}
</script>
