<script setup lang="ts">
import { defineComponent, onUpdated, ref } from 'vue';
import type { CardSettings } from '@renderer/App.vue';

import { gameStore } from '@renderer/data/game';

import Card from './Card.vue';

const props = defineProps<{
  card_list: CardSettings[],
  house: boolean
}>();

defineComponent({
  "name": "CardRow"
});

const scoreVals = ref<number[]>([]);
const score = ref<number>(0);

onUpdated(() => {
  scoreVals.value = props.card_list.flatMap((fCard) => {
    // filter hidden cards and convert to number array
    if (!fCard.visible) {
      return []
    }
    return [fCard.score]
  });

  score.value = (() => {
    if (!scoreVals.value.length) {
      console.log("empty score array")
      return 0;
    }

    return scoreVals.value.reduce((previous, current) => {
      return previous + current;
    });
  })();

  if (props.house) {
    gameStore.houseScore = score.value;
  } else {
    gameStore.playerScore = score.value;
  }
})

</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap justify-start">
      <div class="flex flex-col justify-center align-middle px-4">
        <p class="text-white text-lg font-medium">{{ score }}</p>
      </div>
      <Card v-for="card in props.card_list" :visible="card.visible" :card_path="card.path" />
    </div>
  </div>
</template>