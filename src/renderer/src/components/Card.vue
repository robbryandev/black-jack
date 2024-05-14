<script setup lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';

const props = defineProps<{ visible: boolean, card_path: string }>()

defineComponent({
  name: "Card"
})

const path = import.meta.url;

const cardBack = ref(new URL(`../assets/cards/PNG/card_back.png`, path).href)
const displayCard = ref<string>()
const cardFront = ref<string>()

function updateDisplay() {
  displayCard.value = props.card_path;
  cardFront.value = new URL(`${displayCard.value}`, path).href
}

onMounted(() => {
  updateDisplay()
});

onUpdated(() => {
  updateDisplay()
});
</script>

<template>
  <div>
    <img class="w-28 m-0 p-0" :src="props.visible ? cardFront : cardBack" alt="card value" />
  </div>
</template>