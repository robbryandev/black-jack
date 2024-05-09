<script setup lang="ts">
import { defineComponent, onMounted } from "vue";

import { handStore } from "./data/hands";
import { gameStore } from "./data/game";

import TopBar from './components/TopBar.vue';
import CardRow from './components/CardRow.vue';

export type CardSettings = {
  path: string;
  visible: boolean;
}

function randomCard(): string {
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

  return `../assets/cards/PNG/card_${suit}_${value}.png`
}

function newCard(visible: boolean, house: boolean) {
  console.log("adding new card")
  if (house) {
    handStore.house.push({
      path: randomCard(),
      visible: visible
    });

  } else {
    handStore.player.push({
      path: randomCard(),
      visible: visible
    });
  }
}

defineComponent({
  name: "App"
})

onMounted(() => {
  // house cards
  newCard(false, true)
  newCard(true, true)

  // player cards
  newCard(true, false)
  newCard(true, false)
})

</script>

<template>
  <main class="bg-green-950 w-full min-h-screen z-0">
    <TopBar />
    <div class="py-10 flex flex-col">
      <CardRow :card_list="handStore.house" />
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
      <CardRow :card_list="handStore.player" />
    </div>
  </main>
</template>
