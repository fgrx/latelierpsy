<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface Pagination {
  currentPage: number;
  lastPage: number;
  total: number;
  prevUrl: string | null;
  nextUrl: string | null;
}

const props = defineProps<{
  videos: Video[];
  pagination: Pagination;
  noApiKey: boolean;
}>();

const expanded = ref<Set<string>>(new Set());
const activeVideoId = ref<string | null>(null);

function toggleExpand(id: string) {
  const next = new Set(expanded.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  expanded.value = next;
}

function openVideo(id: string) {
  activeVideoId.value = id;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  activeVideoId.value = null;
  document.body.style.overflow = "";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isLong(desc: string) {
  return desc.length > 180 || desc.includes("\n");
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && activeVideoId.value) closeModal();
}

const pageNumbers = computed(() => {
  const { currentPage, lastPage } = props.pagination;
  const out: (number | "…")[] = [];
  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) out.push(i);
  } else {
    out.push(1);
    if (currentPage > 3) out.push("…");
    const lo = Math.max(2, currentPage - 1);
    const hi = Math.min(lastPage - 1, currentPage + 1);
    for (let i = lo; i <= hi; i++) out.push(i);
    if (currentPage < lastPage - 2) out.push("…");
    out.push(lastPage);
  }
  return out;
});

function pageUrl(n: number) {
  return n === 1 ? "/videos" : `/videos/${n}`;
}

onMounted(() => document.addEventListener("keydown", onKey));
onUnmounted(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <div>
    <div v-if="noApiKey" class="text-center py-20">
      <div
        class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 mb-5"
      >
        <svg
          class="w-7 h-7 text-brand"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          />
        </svg>
      </div>
      <h3 class="font-aveton text-xl text-ink mb-2">Vidéos indisponibles</h3>
      <p
        class="text-[14px] text-ink-faint max-w-md mx-auto leading-relaxed"
      >
        Les vidéos YouTube ne peuvent pas être chargées pour le moment.
        Vérifiez la configuration de la clé API YouTube pour afficher les
        vidéos de la chaîne.
      </p>
    </div>

    <div
      v-else-if="videos.length === 0"
      class="text-center py-20"
    >
      <div
        class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 mb-5"
      >
        <svg
          class="w-7 h-7 text-brand"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
          />
        </svg>
      </div>
      <h3 class="font-aveton text-xl text-ink mb-2">Aucune vidéo</h3>
      <p class="text-[14px] text-ink-faint">
        Aucune vidéo n'a été trouvée sur la chaîne.
      </p>
    </div>

    <div v-else>
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="video in videos"
          :key="video.id"
          class="card-lift bg-white border border-border rounded-2xl overflow-hidden cursor-pointer group"
          @click="openVideo(video.id)"
        >
          <div
            class="relative aspect-video bg-ink overflow-hidden"
          >
            <img
              :src="video.thumbnail"
              :alt="video.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center"
            >
              <div
                class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-6 h-6 text-red-600 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span
              class="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] font-medium px-1.5 py-0.5 rounded"
            >
              YouTube
            </span>
          </div>

          <div class="p-5">
            <h3
              class="font-aveton text-[17px] text-ink leading-snug mb-1.5 line-clamp-2"
            >
              {{ video.title }}
            </h3>
            <p class="text-[12px] text-ink-faint mb-3">
              {{ formatDate(video.publishedAt) }}
            </p>
            <div>
              <p
                :class="[
                  isLong(video.description) && !expanded.has(video.id)
                    ? 'line-clamp-3'
                    : '',
                  'text-[13px] text-ink-light leading-relaxed whitespace-pre-line',
                ]"
              >
                {{ video.description || "Aucune description" }}
              </p>
              <button
                v-if="isLong(video.description)"
                class="mt-1.5 text-[12px] font-semibold text-brand hover:text-brand-dark transition-colors"
                @click.stop="toggleExpand(video.id)"
              >
                {{
                  expanded.has(video.id) ? "Voir moins" : "Voir plus"
                }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav
        v-if="pagination.lastPage > 1"
        class="flex items-center justify-center gap-1.5 mt-12"
      >
        <a
          v-if="pagination.prevUrl"
          :href="pagination.prevUrl"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-ink-light hover:text-brand hover:bg-surface transition-all"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Précédent
        </a>
        <span
          v-else
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-ink-faint/40 cursor-not-allowed"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Précédent
        </span>

        <div class="flex items-center gap-1 mx-2">
          <template v-for="(p, i) in pageNumbers" :key="i">
            <span
              v-if="p === '…'"
              class="px-1.5 text-ink-faint text-[13px]"
            >…</span>
            <a
              v-else
              :href="pageUrl(p as number)"
              :class="[
                'w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-medium transition-all',
                p === pagination.currentPage
                  ? 'bg-brand text-white shadow-md'
                  : 'text-ink-light hover:bg-surface hover:text-brand',
              ]"
            >
              {{ p }}
            </a>
          </template>
        </div>

        <a
          v-if="pagination.nextUrl"
          :href="pagination.nextUrl"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-ink-light hover:text-brand hover:bg-surface transition-all"
        >
          Suivant
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
        <span
          v-else
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-ink-faint/40 cursor-not-allowed"
        >
          Suivant
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </nav>
    </div>

    <Teleport to="body">
      <div
        v-if="activeVideoId"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div
          class="absolute inset-0 bg-ink/90"
          @click="closeModal"
        />
        <div
          class="relative z-10 w-full max-w-4xl"
          @click.stop
        >
          <button
            class="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
            @click="closeModal"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            class="rounded-2xl overflow-hidden shadow-2xl bg-black"
          >
            <div class="aspect-video">
              <iframe
                :src="`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>
          <div class="mt-4 text-center">
            <a
              :href="`https://www.youtube.com/watch?v=${activeVideoId}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors"
            >
              Voir sur YouTube
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>