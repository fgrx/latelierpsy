<template>
  <div v-if="status === 'error'" class="py-6 text-center animate-fade-in">
    <div class="text-4xl mb-3">😕</div>
    <h1 class="font-pronell text-2xl text-ink mb-2">Lien incomplet</h1>
    <p class="text-sm text-ink-light leading-relaxed mb-6">
      {{ errorMessage }}
    </p>
    <a
      href="/"
      class="btn-shine inline-block text-sm font-semibold py-2.5 px-6 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors duration-200"
      >Retour à l'accueil</a
    >
  </div>

  <div v-else-if="status === 'loading'" class="py-6 text-center">
    <div class="text-4xl mb-3 animate-bounce">⏳</div>
    <p class="text-sm text-ink-light">Préparation de votre téléchargement…</p>
  </div>

  <div v-else class="py-4 text-center animate-scale-in">
    <div class="text-4xl mb-3">📥</div>
    <h1 class="font-pronell text-2xl text-brand mb-2">
      Votre téléchargement est lancé !
    </h1>
    <p class="text-sm text-ink-light leading-relaxed">
      Le fichier <strong class="text-ink">« {{ fileName }} »</strong> arrive dans
      vos téléchargements. Si rien ne se passe, utilisez le bouton ci-dessous.
    </p>

    <p v-if="subscribed" class="text-sm text-ink-light leading-relaxed mt-4">
      Vous êtes bien inscrit·e à
      <strong class="text-ink">la Lettre Psy</strong> 🎉
    </p>
    <p
      v-else-if="subscribed === false"
      class="text-xs text-amber-700 leading-relaxed mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-left"
    >
      {{ subscriptionWarning }}
    </p>

    <a
      :href="fileUrl ?? '#'"
      :download="fileName"
      class="btn-shine mt-6 inline-block w-full text-base font-semibold py-3 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors duration-200"
    >
      Le téléchargement n'a pas démarré ? Cliquez ici →
    </a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  apiUrl: string;
  apiKey?: string;
  defaultListId?: string;
}>();

const status = ref<"loading" | "done" | "error">("loading");
const fileUrl = ref<string | null>(null);
const fileName = ref("");
const subscribed = ref<boolean | null>(null);
const errorMessage = ref("");
const subscriptionWarning = ref("");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(message: string): boolean {
  status.value = "error";
  errorMessage.value = message;
  return false;
}

function triggerDownload() {
  if (!fileUrl.value) return;
  const link = document.createElement("a");
  link.href = fileUrl.value;
  link.download = fileName.value;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const rawFile = params.get("file");
  const email = (params.get("email") ?? "").trim();
  const name = (params.get("name") ?? "").trim() || undefined;
  const listId =
    (params.get("list") ?? params.get("listId") ?? "").trim() || undefined;

  if (!rawFile) {
    fail(
      "Le paramètre « file » est manquant dans l'URL (ex. ?file=/gifts/mon-fichier.pdf).",
    );
    return;
  }

  let url: URL;
  try {
    url = new URL(rawFile, window.location.origin);
  } catch {
    fail("Le paramètre « file » est invalide.");
    return;
  }
  if (url.origin !== window.location.origin) {
    fail(
      "Le paramètre « file » pointe vers une origine externe non autorisée : le fichier doit être hébergé sur ce site.",
    );
    return;
  }

  fileUrl.value = url.href;
  const segments = url.pathname.split("/").filter(Boolean);
  fileName.value = decodeURIComponent(segments[segments.length - 1] ?? "fichier");

  triggerDownload();

  if (!email || !EMAIL_REGEX.test(email)) {
    subscribed.value = false;
    subscriptionWarning.value =
      "Adresse email manquante ou invalide dans l'URL : le fichier est bien téléchargé, mais l'inscription à la newsletter n'a pas été effectuée.";
    status.value = "done";
    return;
  }

  try {
    const res = await fetch(props.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(props.apiKey ? { "x-api-key": props.apiKey } : {}),
      },
      body: JSON.stringify({
        email,
        name,
        listId: listId ?? props.defaultListId,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    subscribed.value = true;
  } catch {
    subscribed.value = false;
    subscriptionWarning.value =
      "Le fichier est bien téléchargé, mais l'inscription à la newsletter n'a pas pu être confirmée.";
  }
  status.value = "done";
});
</script>
