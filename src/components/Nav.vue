<template>
  <nav class="sticky top-0 z-50 nav-blur bg-white/95 border-b border-border">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center gap-6">
      <a href="/" class="shrink-0">
        <img :src="logoSrc" alt="Catherine la Psy" class="h-11 w-auto" />
      </a>

      <div class="hidden md:flex items-center gap-1 flex-1">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="nav-underline text-[13.5px] font-medium text-ink-light px-3 py-2 rounded-lg hover:text-brand hover:bg-surface transition-all duration-200"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="hidden md:flex items-center gap-2 ml-auto">
        <a
          href="#"
          class="text-[13px] font-semibold px-4 py-2 rounded-full border-[1.5px] border-brand text-brand hover:bg-surface transition-all duration-200"
        >
          Connexion
        </a>
        <a
          href="#"
          class="btn-shine text-[13px] font-semibold px-5 py-2 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors duration-200"
        >
          Nos ateliers →
        </a>
      </div>

      <button class="md:hidden ml-auto p-2" @click="open = !open">
        <svg
          class="w-5 h-5 text-ink"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            v-if="open"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="open"
      class="md:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-2 animate-fade-up"
    >
      <a
        v-for="link in navLinks"
        :key="link.label"
        :href="link.href"
        class="text-left text-sm font-medium text-ink-light py-2 border-b border-border/50 last:border-0"
      >
        {{ link.label }}
      </a>
      <div class="flex gap-2 pt-2">
        <a href="#" class="flex-1 text-sm font-semibold py-2 rounded-full border-[1.5px] border-brand text-brand text-center">Connexion</a>
        <a href="#" class="flex-1 text-sm font-semibold py-2 rounded-full bg-brand text-white text-center">Nos ateliers</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  logoSrc: string;
  navLinks: { label: string; href: string }[];
}>();

const open = ref(false);
</script>
