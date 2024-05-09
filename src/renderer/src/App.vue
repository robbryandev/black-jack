<script setup lang="ts">
import { onMounted, watchEffect } from "vue";

import { handStore } from "./data/hands";
import { gameStore } from "./data/game";

import TopBar from './components/TopBar.vue';
import CardRow from './components/CardRow.vue';

export type CardSettings = {
  path: string;
  score: number;
  visible: boolean;
}

function randomCard(): { path: string, score: number } {
  console.log("setting random card stuff")
  const randNum = Math.floor(Math.random() * 12)
  const randSuit = Math.floor(Math.random() * 4)

  const specials = {
    "01": "A",
    "11": "J",
    "12": "Q",
    "13": "K"
  }

  let num = `${randNum + 1}`.padStart(2, "0")
  let value = num;
  if (typeof specials[num] !== "undefined") {
    value = specials[num]
  }


  let suit = "hearts"
  switch (randSuit) {
    case 1:
      suit = "hearts"
      break;
    case 2:
      suit = "clubs"
      break;
    case 3:
      suit = "spades"
      break;
    case 4:
      suit = "diamonds"
      break;
    default:
      suit = "hearts"
      break;
  }

  return { path: `../assets/cards/PNG/card_${suit}_${value}.png`, score: randNum + 1 }
}

function newCard(visible: boolean, house: boolean) {
  console.log("adding new card")
  const randCard = randomCard();

  if (house) {
    handStore.house.push({
      path: randCard.path,
      score: randCard.score,
      visible: visible
    });
  } else {
    handStore.player.push({
      path: randCard.path,
      score: randCard.score,
      visible: visible
    });
  }
}

function resetGame() {
  handStore.house = []
  handStore.player = []

  // house cards
  newCard(false, true)
  newCard(true, true)

  // player cards
  newCard(true, false)
  newCard(true, false)
}

onMounted(() => {
  resetGame()
})

watchEffect(() => {
  console.log("playerScore: " + gameStore.playerScore)
  if (gameStore.playerScore > 21) {
    resetGame()
  }
})

</script>

<template>
  <main class="bg-green-950 w-full min-h-screen z-0">
    <TopBar />
    <div class="py-10 flex flex-col">
      <CardRow :card_list="handStore.house" :house="true" />
      <div class="text-white font-semibold basis-64 flex flex-row justify-center">
        <div
          class="flex flex-col self-center justify-center align-middle gap-2 h-3/5 px-10 bg-neutral-900/90 border border-black rounded-2xl">
          <button class="px-2 py-1.5 rounded-md bg-neutral-800 w-20 mx-auto" :onclick="() => {
            if (!gameStore.done) {
              newCard(true, false)
            }
          }">hit</button>
          <button class="px-2 py-1.5 rounded-md bg-neutral-800 w-20 mx-auto">hold</button>
        </div>
      </div>
      <CardRow :card_list="handStore.player" :house="false" />
    </div>
  </main>
</template>
