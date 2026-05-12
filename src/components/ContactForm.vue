<template>
  <div v-if="sent" class="text-center py-8 animate-scale-in">
    <div
      class="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4"
    >
      <svg
        class="w-8 h-8 text-brand"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <div class="font-aveton text-2xl text-ink mb-2">Message envoyé !</div>
    <p class="text-sm text-ink-light">
      Nous vous répondrons dans les plus brefs délais.
    </p>
  </div>

  <div
    v-else-if="form.category === 'therapie'"
    class="text-center py-6 animate-scale-in"
  >
    <div
      class="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5"
    >
      <svg
        class="w-7 h-7 text-gold"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div class="font-aveton text-xl text-ink mb-4">
      Consultations individuelles
    </div>
    <p class="text-sm text-ink-light leading-relaxed mb-3">
      Catherine ne propose plus de consultation en présentiel ou en visio.
    </p>
    <p class="text-sm text-ink-light leading-relaxed mb-5">
      En revanche, Fabien propose des accompagnements en hypnose Eriksonienne et
      en thérapie Mosaic (proche de l'EMDR).
    </p>
    <a
      href="https://therapiefgx.com"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-shine inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-brand-dark text-white hover:bg-brand-dark/90 transition-colors shadow-md shadow-brand-dark/20"
    >
      En savoir plus sur therapiefgx.com
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  </div>

  <div
    v-else-if="form.category === 'supervision'"
    class="text-center py-6 animate-scale-in"
  >
    <div
      class="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5"
    >
      <svg
        class="w-7 h-7 text-gold"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
    <div class="font-aveton text-xl text-ink mb-4">Supervisions</div>
    <p class="text-sm text-ink-light leading-relaxed mb-3">
      Catherine ne prend plus de nouvelles supervisions individuelles.
    </p>
    <p class="text-sm text-ink-light leading-relaxed mb-5">
      En revanche elle proposera prochainement des supervisions de groupe.
    </p>
    <p class="text-sm text-ink-light leading-relaxed mb-5">
      Pour être tenu au courant des prochaines supervisions de groupe,
      inscrivez-vous à la mailing list dédiée en cliquant sur :
    </p>
    <a
      href="/supervisions"
      class="btn-shine inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors shadow-md shadow-brand/20"
    >
      S'inscrire aux supervisions de groupe
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        viewBox="0 0 24 24"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </a>
  </div>

  <form
    v-else
    name="contact"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="submit"
    :class="['text-left', variant === 'modal' ? 'space-y-4' : 'space-y-5']"
  >
    <input type="hidden" name="form-name" value="contact" />
    <input name="bot-field" hidden />

    <div>
      <label class="block font-aveton text-sm text-ink mb-1.5"
        >Catégorie</label
      >
      <select
        v-model="form.category"
        name="category"
        required
        class="block w-full py-3 px-4 text-sm text-ink bg-white border border-border rounded-xl outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20 appearance-none cursor-pointer"
      >
        <option v-for="cat in categories" :key="cat.value" :value="cat.value">
          {{ cat.label }}
        </option>
      </select>
    </div>

    <div>
      <label class="block font-aveton text-sm text-ink mb-1.5"
        >Objet de votre email</label
      >
      <input
        v-model="form.subject"
        type="text"
        name="subject"
        required
        placeholder="L'objet de votre message"
        class="block w-full py-3 px-4 text-sm text-ink bg-white border border-border rounded-xl outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-ink-faint/50"
      />
    </div>

    <div>
      <label class="block font-aveton text-sm text-ink mb-1.5"
        >Votre nom</label
      >
      <input
        v-model="form.name"
        type="text"
        name="name"
        required
        placeholder="Prénom Nom"
        class="block w-full py-3 px-4 text-sm text-ink bg-white border border-border rounded-xl outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-ink-faint/50"
      />
    </div>

    <div>
      <label class="block font-aveton text-sm text-ink mb-1.5"
        >Votre adresse email</label
      >
      <input
        v-model="form.email"
        type="email"
        name="email"
        required
        placeholder="votre@email.fr"
        class="block w-full py-3 px-4 text-sm text-ink bg-white border border-border rounded-xl outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-ink-faint/50"
      />
    </div>

    <div>
      <label class="block font-aveton text-sm text-ink mb-1.5"
        >Votre message</label
      >
      <textarea
        v-model="form.message"
        name="message"
        required
        rows="6"
        placeholder="Écrivez votre message ici..."
        class="block w-full py-3 px-4 text-sm text-ink bg-white border border-border rounded-xl outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none placeholder:text-ink-faint/50"
      ></textarea>
    </div>

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

    <button
      type="submit"
      :disabled="!isValid || submitting"
      :class="[
        'btn-shine w-full text-sm font-semibold py-3 rounded-full transition-all duration-300',
        isValid && !submitting
          ? 'bg-brand text-white hover:bg-brand-dark shadow-md shadow-brand/20'
          : 'bg-border text-ink-faint cursor-not-allowed',
      ]"
    >
      <span v-if="submitting" class="inline-flex items-center gap-2">
        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        Envoi en cours...
      </span>
      <span v-else>Envoyer</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

interface Category {
  value: string;
  label: string;
}

const props = defineProps<{
  variant?: "page" | "modal";
  categories: Category[];
}>();

const form = reactive({
  category: props.categories[0]?.value ?? "",
  subject: "",
  name: "",
  email: "",
  message: "",
});

const submitting = ref(false);
const sent = ref(false);
const error = ref("");

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const isValid = computed(
  () =>
    form.category &&
    form.subject.trim() &&
    form.name.trim() &&
    isValidEmail(form.email) &&
    form.message.trim(),
);

async function submit() {
  error.value = "";
  submitting.value = true;

  try {
    const body = new URLSearchParams({
      "form-name": "contact",
      category: form.category,
      subject: form.subject,
      name: form.name,
      email: form.email,
      message: form.message,
    });

    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (res.ok) {
      sent.value = true;
    } else {
      error.value = "Une erreur est survenue. Veuillez réessayer.";
    }
  } catch {
    error.value = "Une erreur réseau est survenue. Veuillez réessayer.";
  } finally {
    submitting.value = false;
  }
}
</script>
