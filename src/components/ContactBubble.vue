<template>
  <button
    @click="open = true"
    aria-label="Nous contacter"
    class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-coral rounded-full shadow-lg shadow-coral/30 flex items-center justify-center text-white cursor-pointer hover:bg-coral/90 hover:scale-110 hover:shadow-xl hover:shadow-coral/40 active:scale-95 transition-all duration-300 animate-fade-up"
    :style="{ animationDelay: '1s' }"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  </button>

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4"
        @keydown.escape="open = false"
      >
        <div
          class="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          @click="open = false"
        ></div>

        <div
          class="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        >
          <div
            class="sticky top-0 bg-white rounded-t-2xl border-b border-border px-6 py-4 flex items-center justify-between z-10"
          >
            <div>
              <h3 class="font-aveton text-lg text-ink">
                Envoyez-nous un message
              </h3>
            </div>
            <button
              @click="open = false"
              aria-label="Fermer"
              class="w-8 h-8 rounded-full hover:bg-surface flex items-center justify-center transition-colors text-ink-faint hover:text-ink"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="px-6 py-5">
            <ContactForm variant="modal" :categories="categories" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ContactForm from "./ContactForm.vue";

interface Category {
  value: string;
  label: string;
}

defineProps<{ categories: Category[] }>();

const open = ref(false);

watch(open, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});
</script>

<style scoped>
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-leave-to {
  opacity: 0;
}
</style>
