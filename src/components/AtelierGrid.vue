<template>
  <div>
    <div class="flex items-center justify-center gap-3 mb-12">
      <button
        v-for="f in filters"
        :key="f.value"
        @click="filter = f.value"
        :class="[
          'text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300',
          filter === f.value
            ? 'bg-brand text-white shadow-md shadow-brand/20'
            : 'border-[1.5px] border-brand text-brand hover:bg-surface'
        ]"
      >
        {{ f.label }}
      </button>
    </div>

    <template v-if="filtered.length === 0">
      <div class="text-center py-16">
        <p class="text-ink-light text-base">Aucun atelier ne correspond à ce filtre pour le moment.</p>
      </div>
    </template>

    <template v-else>
      <TransitionGroup name="grid" tag="div">
        <a
          v-if="featured"
          :key="featured.id"
          :href="`/ateliers/${featured.id}`"
          class="block card-lift rounded-2xl overflow-hidden border border-border shadow-sm mb-10"
          :class="featuredBg(featured.colorPresentation)"
        >
          <div class="md:flex">
            <div
              class="md:w-1/2 flex items-center justify-center p-10 md:p-14"
              :class="featured.colorPresentation"
            >
              <img
                v-if="featured.logoSrc"
                :src="featured.logoSrc"
                :alt="featured.title"
                class="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-lg"
              />
            </div>
            <div class="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <div class="flex flex-wrap items-center gap-2 mb-4">
                <span :class="['inline-flex text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider', tagStyle(featured.tag).bg, tagStyle(featured.tag).text]">
                  {{ featured.tag }}
                </span>
                <span v-if="featured.isPro" class="inline-flex text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gold text-ink">
                  Pour les professionnel·les
                </span>
                <span v-if="featured.isForAll" class="inline-flex text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-coral text-white">
                  Pour tous·tes
                </span>
                <span class="inline-flex items-center gap-1.5 text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-brand text-white">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot"></span>
                  Nouveau
                </span>
              </div>
              <h2 class="font-aveton text-2xl md:text-3xl leading-snug text-ink mb-3">{{ featured.title }}</h2>
              <p class="text-base leading-relaxed text-ink-light mb-6">{{ featured.description }}</p>
              <span class="btn-shine inline-flex items-center gap-2 self-start text-sm font-semibold px-6 py-3 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors shadow-md shadow-brand/20">
                Découvrir l'atelier
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        </a>

        <div v-if="rest.length > 0" :key="'grid'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            v-for="(a, i) in rest"
            :key="a.id"
            :href="`/ateliers/${a.id}`"
            class="card-lift bg-white rounded-2xl overflow-hidden border border-surface shadow-sm group"
            :style="{ transitionDelay: `${i * 0.08}s` }"
          >
            <div
              class="flex items-center justify-center h-48"
              :class="a.colorPresentation"
            >
              <img
                v-if="a.logoSrc"
                :src="a.logoSrc"
                :alt="a.title"
                class="w-40 h-40 object-contain drop-shadow group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="p-6">
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span :class="['inline-flex text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider', tagStyle(a.tag).bg, tagStyle(a.tag).text]">
                  {{ a.tag }}
                </span>
                <span v-if="a.isPro" class="inline-flex text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gold text-ink">
                  Pour les professionnel·les
                </span>
                <span v-if="a.isForAll && !a.isPro" class="inline-flex text-2xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-coral text-white">
                  Pour tous·tes
                </span>
              </div>
              <div class="font-aveton text-xl leading-snug text-ink mb-2">{{ a.title }}</div>
              <div class="text-sm leading-relaxed text-ink-faint mb-5">{{ a.description }}</div>
              <span class="flex items-center gap-2 text-sm font-semibold text-brand group-hover:gap-3 transition-all">
                En savoir plus
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </TransitionGroup>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Atelier {
  id: string;
  title: string;
  tag: string;
  description: string;
  logoSrc: string | null;
  colorPresentation: string;
  isPro: boolean;
  isForAll: boolean;
}

const props = defineProps<{ ateliers: Atelier[] }>();
const filter = ref<"all" | "forAll" | "pro">("all");

const filters = [
  { value: "all" as const, label: "Tous" },
  { value: "forAll" as const, label: "Pour tous·tes" },
  { value: "pro" as const, label: "Pour les pros" },
];

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  "Estime de soi": { bg: "bg-surface", text: "text-brand" },
  "Émotions": { bg: "bg-red-50", text: "text-coral" },
  "Relations": { bg: "bg-blue-50", text: "text-blue-600" },
  "Psychotrauma": { bg: "bg-white", text: "text-brand" },
  "Traumas": { bg: "bg-white", text: "text-brand" },
};

const tagStyle = (tag: string) => TAG_STYLES[tag] || { bg: "bg-surface", text: "text-brand" };

const COLOR_BG_MAP: Record<string, string> = {
  "bg-brand": "bg-brand/5",
  "bg-brand-dark": "bg-brand-dark/5",
  "bg-brand-alternate": "bg-brand-alternate/5",
  "bg-coral": "bg-coral/5",
  "bg-gold": "bg-gold/5",
};

const featuredBg = (colorPresentation: string) => COLOR_BG_MAP[colorPresentation] || "bg-brand/5";

const filtered = computed(() => {
  if (filter.value === "pro") return props.ateliers.filter((a) => a.isPro);
  if (filter.value === "forAll") return props.ateliers.filter((a) => a.isForAll);
  return props.ateliers;
});

const featured = computed(() => filtered.value[0] || null);
const rest = computed(() => filtered.value.slice(1));
</script>

<style scoped>
.grid-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 0.68, 0, 1.2);
}
.grid-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.grid-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.grid-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
