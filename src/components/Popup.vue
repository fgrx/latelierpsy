<template>
  <div v-if="visible" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-ink/50 backdrop-blur-sm" @click="close"></div>
    <div class="relative bg-brand text-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-fade-up">
      <button
        @click="close"
        class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors text-xl leading-none"
        aria-label="Fermer"
      >
        ×
      </button>

      <div class="flex items-center justify-center gap-3 mb-5">
        <span class="text-3xl shrink-0">{{ icon }}</span>
        <h3 class="text-xl font-semibold text-center">{{ title }}</h3>
      </div>

      <img v-if="image" :src="image" alt="" class="rounded-lg w-full object-cover max-h-48 mb-5" />

      <p class="text-white/90 leading-relaxed mb-6">{{ content }}</p>

      <div class="flex flex-wrap gap-3 justify-center">
        <a
          :href="buttonHref"
          @click="close"
          class="btn-shine bg-white text-brand text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
        >
          {{ buttonLabel }}
        </a>
        <button
          @click="close"
          class="text-sm font-semibold px-5 py-2.5 rounded-full border-[1.5px] border-white/30 text-white hover:bg-white/10 transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  enabled: boolean;
  id: string;
  icon: string;
  title: string;
  content: string;
  buttonLabel: string;
  buttonHref: string;
  image: string;
}>();

const visible = ref(false);

onMounted(() => {
  if (props.enabled && localStorage.getItem("banner_closed") !== props.id) {
    visible.value = true;
  }
});

function close() {
  visible.value = false;
  localStorage.setItem("banner_closed", props.id);
}
</script>