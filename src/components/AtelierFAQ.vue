<template>
  <section
    v-if="questions && questions.length"
    class="py-12 md:py-16 bg-surface-2"
  >
    <div class="max-w-3xl mx-auto px-6">
      <div class="text-center mb-12">
        <span
          class="text-xs font-bold tracking-widest uppercase text-ink-faint block mb-3"
          >FAQ</span
        >
        <h2 class="font-aveton text-2xl md:text-3xl text-ink">
          Il vous reste quelques questions ?
        </h2>
      </div>

      <div class="space-y-3">
        <div
          v-for="(q, i) in questions"
          :key="i"
          class="rounded-xl border border-border overflow-hidden"
        >
          <button
            @click="openIndex = openIndex === i ? -1 : i"
            class="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-surface/50 transition-colors"
          >
            <span class="text-sm font-medium text-ink leading-snug">{{
              q
            }}</span>
            <svg
              :class="[
                'w-4 h-4 text-ink-faint shrink-0 transition-transform duration-300',
                openIndex === i ? 'rotate-180' : '',
              ]"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <Transition
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
            @after-leave="onAfterLeave"
          >
            <div v-if="openIndex === i" class="faq-answer">
              <div class="px-6 pb-5">
                <p class="text-sm text-ink-light leading-relaxed">
                  Contactez-nous via le
                  <a
                    href="/contact"
                    class="text-brand underline underline-offset-2"
                    >formulaire de contact</a
                  >
                  ou par email — nous vous répondrons rapidement.
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ questions: string[] }>();
const openIndex = ref(-1);

function onBeforeEnter(el: Element) {
  const e = el as HTMLElement;
  e.style.display = "grid";
  e.style.gridTemplateRows = "0fr";
  e.style.opacity = "0";
}

function onEnter(el: Element, done: () => void) {
  const e = el as HTMLElement;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.style.transition =
        "grid-template-rows 0.35s ease-out, opacity 0.25s ease-out";
      e.style.gridTemplateRows = "1fr";
      e.style.opacity = "1";
    });
  });
  e.addEventListener("transitionend", done, { once: true });
}

function onAfterEnter(el: Element) {
  const e = el as HTMLElement;
  e.style.transition = "";
  e.style.gridTemplateRows = "";
  e.style.opacity = "";
}

function onBeforeLeave(el: Element) {
  const e = el as HTMLElement;
  e.style.display = "grid";
  e.style.gridTemplateRows = "1fr";
  e.style.opacity = "1";
}

function onLeave(el: Element, done: () => void) {
  const e = el as HTMLElement;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.style.transition =
        "grid-template-rows 0.3s ease-out, opacity 0.2s ease-out";
      e.style.gridTemplateRows = "0fr";
      e.style.opacity = "0";
    });
  });
  e.addEventListener("transitionend", done, { once: true });
}

function onAfterLeave(el: Element) {
  const e = el as HTMLElement;
  e.style.transition = "";
  e.style.gridTemplateRows = "";
  e.style.opacity = "";
}
</script>

<style scoped>
.faq-answer {
  overflow: hidden;
}
</style>
