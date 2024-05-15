<script setup lang="ts">
import { defineComponent, onUpdated, ref } from 'vue';
import type { CardSettings } from './Game.vue';

import { gameStore } from '@renderer/data/game';

import Card from './Card.vue';

const props = defineProps<{
  card_list: CardSettings[],
  house: boolean
}>();

defineComponent({
  "name": "CardRow"
});

const displayCards = ref<CardSettings[]>([]);
const scoreVals = ref<number[]>([]);
const score = ref<number>(0);

onUpdated(() => {
  displayCards.value = props.card_list;
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
        <p v-if="!gameStore.gameDone" class="text-white text-lg font-medium">{{
          house ? gameStore.houseScore : gameStore.playerScore }}</p>
      </div>
      <Card v-for="card in displayCards" :visible="card.visible" :card_path="card.path" />
    </div>
  </div>
</template>