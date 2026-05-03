<template>
  <div>
    <div class="flex items-center justify-center gap-3 mb-10">
      <button
        @click="filter = 'all'"
        :class="[
          'text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-300',
          filter === 'all'
            ? 'bg-brand text-white shadow-md shadow-brand/20'
            : 'border-[1.5px] border-brand text-brand hover:bg-surface'
        ]"
      >
        Pour tous·tes
      </button>
      <button
        @click="filter = 'pro'"
        :class="[
          'text-[13px] font-semibold px-5 py-2 rounded-full transition-all duration-300',
          filter === 'pro'
            ? 'bg-brand text-white shadow-md shadow-brand/20'
            : 'border-[1.5px] border-brand text-brand hover:bg-surface'
        ]"
      >
        Pour les pros
      </button>
    </div>

    <template v-if="filtered.length === 0">
      <div class="text-center py-16">
        <p class="text-ink-light text-[15px]">Aucun atelier professionnel pour le moment.</p>
      </div>
    </template>

    <template v-else>
      <TransitionGroup name="grid" tag="div">
        <div v-if="featured" :key="featured.id" class="card-lift bg-white rounded-2xl overflow-hidden border border-surface shadow-sm mb-10">
          <div class="md:flex">
            <div class="md:w-1/2 overflow-hidden relative h-64 md:h-auto">
              <img
                :src="featured.image"
                :alt="featured.title"
                width="800"
                height="500"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            <div class="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <div class="flex items-center gap-2 mb-4">
                <span :class="['inline-flex text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider', tagStyle(featured.tag).bg, tagStyle(featured.tag).text]">
                  {{ featured.tag }}
                </span>
                <span v-if="featured.isPro" class="inline-flex text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gold text-ink">
                  Pour les professionnel·les
                </span>
                <span class="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-brand text-white">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot"></span>
                  Nouveau
                </span>
              </div>
              <h2 class="font-aveton text-2xl md:text-[28px] leading-snug text-ink mb-3">{{ featured.title }}</h2>
              <p class="text-[15px] leading-relaxed text-ink-light mb-6">{{ featured.description }}</p>
              <a :href="`/ateliers/${featured.id}`" class="btn-shine inline-flex items-center gap-2 self-start text-[13px] font-semibold px-6 py-3 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors shadow-md shadow-brand/20">
                Découvrir l'atelier
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div v-if="rest.length > 0" :key="'grid'" class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(a, i) in rest"
            :key="a.id"
            class="card-lift bg-white rounded-2xl overflow-hidden border border-surface shadow-sm"
            :style="{ transitionDelay: `${i * 0.08}s` }"
          >
            <div class="overflow-hidden h-48">
              <img
                :src="a.image"
                :alt="a.title"
                width="600"
                height="400"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-6">
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span :class="['inline-flex text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider', tagStyle(a.tag).bg, tagStyle(a.tag).text]">
                  {{ a.tag }}
                </span>
                <span v-if="a.isPro" class="inline-flex text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gold text-ink">
                  Pour les professionnel·les
                </span>
              </div>
              <div class="font-aveton text-[19px] leading-snug text-ink mb-2">{{ a.title }}</div>
              <div class="text-[13px] leading-relaxed text-ink-faint mb-5">{{ a.description }}</div>
              <a :href="`/ateliers/${a.id}`" class="group flex items-center gap-2 text-[13px] font-semibold text-brand">
                En savoir plus
                <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
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
  image: string;
  isPro: boolean;
}

const props = defineProps<{ ateliers: Atelier[] }>();
const filter = ref<"all" | "pro">("all");

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  "Estime de soi": { bg: "bg-surface", text: "text-brand" },
  "Émotions": { bg: "bg-red-50", text: "text-coral" },
  "Relations": { bg: "bg-blue-50", text: "text-blue-600" },
};

const tagStyle = (tag: string) => TAG_STYLES[tag] || { bg: "bg-surface", text: "text-brand" };

const filtered = computed(() => {
  if (filter.value === "pro") return props.ateliers.filter((a) => a.isPro);
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
