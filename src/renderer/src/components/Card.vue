<script setup lang="ts">
import { cards } from '@renderer/assets/cards';
import { defineComponent, onMounted, onUpdated, ref } from 'vue';

const props = defineProps<{ visible: boolean, card_path: string }>()

defineComponent({
  name: "Card"
})

const cardBack = cards["card_back"] as string
const cardFront = ref<string>()

function updateDisplay() {
  cardFront.value = cards[props.card_path] as string;
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