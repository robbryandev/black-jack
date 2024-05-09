<script setup lang="ts">
import { defineComponent, ref } from 'vue';

const props = defineProps<{ visible: boolean, card_path: string }>()

defineComponent({
  name: "Card"
})

const cardBack = ref(new URL(`../assets/cards/PNG/card_back.png`, import.meta.url).href)
const cardFront = ref(new URL(`${props.card_path}`, import.meta.url).href)
</script>

<template>
  <div>
    <img class="w-28 m-0 p-0" :src="props.visible ? cardFront : cardBack" alt="card value" />
  </div>
</template>