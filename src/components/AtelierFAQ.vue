<template>
  <section v-if="questions && questions.length" class="py-12 md:py-16 bg-surface-2">
    <div class="max-w-3xl mx-auto px-6">
      <div class="text-center mb-12">
        <span class="text-[11px] font-bold tracking-widest uppercase text-ink-faint block mb-3">FAQ</span>
        <h2 class="font-aveton text-2xl md:text-3xl text-ink">Il vous reste quelques questions ?</h2>
      </div>

      <div class="space-y-3">
        <div
          v-for="(q, i) in questions"
          :key="i"
          class="bg-white rounded-xl border border-border overflow-hidden"
        >
          <button
            @click="openIndex = openIndex === i ? -1 : i"
            class="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
          >
            <span class="text-[14px] font-medium text-ink leading-snug">{{ q }}</span>
            <svg
              :class="['w-4 h-4 text-ink-faint shrink-0 transition-transform duration-300', openIndex === i ? 'rotate-180' : '']"
              fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-show="openIndex === i"
            class="px-6 pb-4"
          >
            <p class="text-[13px] text-ink-light leading-relaxed">
              Contactez-nous via le <a href="/contact" class="text-brand underline underline-offset-2">formulaire de contact</a> ou par email — nous vous répondrons rapidement.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ questions: string[] }>();
const openIndex = ref(-1);
</script>
