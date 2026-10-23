<template>
  <div v-if="sent" class="text-center py-8 animate-scale-in">
    <div class="text-4xl mb-3">📧</div>
    <div class="font-pronell text-2xl mb-2 text-brand">C'est envoyé !</div>
    <p class="text-sm text-ink-faint leading-relaxed">
      Rendez-vous dans votre boîte mail : vous y trouverez un email contenant
      un lien vers votre fichier
      <strong class="text-ink">« {{ giftTitle }} »</strong>.<br />
      Pensez à vérifier vos spams si vous ne le voyez pas.
    </p>
  </div>
  <div v-else class="flex flex-col gap-3">
    <input
      type="text"
      placeholder="Votre prénom"
      v-model="name"
      :class="[
        'w-full text-sm px-4 py-3 border rounded-xl text-ink outline-none transition-colors duration-200',
        error ? 'border-red-500' : 'border-border focus:border-brand',
      ]"
    />
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
      @click="download"
      :disabled="loading"
      class="btn-shine w-full text-base font-semibold py-3 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {{ loading ? "Envoi en cours…" : buttonLabel }}
    </button>
    <p class="text-xs text-ink-faint text-center leading-relaxed">
      Vous recevrez votre fichier par email. Votre adresse ne sert qu'à cet
      envoi et ne sera pas ajoutée à une liste de diffusion.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    giftTitle: string;
    fileUrl: string;
    fileName: string;
    apiUrl: string;
    apiKey?: string;
    buttonLabel?: string;
  }>(),
  {
    buttonLabel: "Envoi par email →",
  },
);

const name = ref("");
const email = ref("");
const sent = ref(false);
const error = ref("");
const loading = ref(false);

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

async function download() {
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
      headers: {
        "Content-Type": "application/json",
        ...(props.apiKey ? { "x-api-key": props.apiKey } : {}),
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value.trim(),
        fileUrl: props.fileUrl,
        fileName: props.fileName,
        fileTitle: props.giftTitle,
      }),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de l'envoi du fichier.");
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
