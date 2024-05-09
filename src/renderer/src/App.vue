<script setup lang="ts">
import { defineComponent, ref } from "vue";
import TopBar from './components/TopBar.vue';
import CardRow from './components/CardRow.vue';

export type CardSettings = {
  path: string;
  visible: boolean;
}

const playerCards = ref<CardSettings[]>([]);
const houseCards = ref<CardSettings[]>([]);

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
    houseCards.value.push({
      path: randomCard(),
      visible: visible
    });

  } else {
    playerCards.value.push({
      path: randomCard(),
      visible: visible
    });
  }
}

defineComponent({
  name: "App"
})

</script>

<template>
  <main class="bg-green-950 w-full min-h-screen z-0">
    <TopBar />
    <button class="px-2 py-1.5 bg-neutral-400 text-black" :onclick="() => { newCard(true, false) }">+</button>
    <CardRow :card_list="playerCards" />
  </main>
</template>
