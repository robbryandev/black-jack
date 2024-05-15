<script setup lang="ts">
import { defineComponent, onMounted, watchEffect } from "vue";

import { handStore } from "../data/hands";
import { gameStore } from "../data/game"

import CardRow from './CardRow.vue';

export type CardSettings = {
  path: string;
  score: number;
  visible: boolean;
}

defineComponent({
  "name": "Game"
})

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

  return { path: `card_${suit}_${value}`, score: randNum + 1 }
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

function resetGame(full: boolean) {
  if (!full) {
    gameStore.roundDone = true
    return
  }

  if (gameStore.gameDone) {
    gameStore.playerChips = gameStore.baseChips;

    gameStore.gameDone = false;
  }

  gameStore.roundDone = false
  gameStore.playerDone = false

  gameStore.playerScore = 0;
  gameStore.houseScore = 0;

  handStore.house = []
  handStore.player = []

  // house cards
  newCard(false, true)
  newCard(true, true)

  // player cards
  newCard(true, false)
  newCard(true, false)

  gameStore.playerChips -= gameStore.betChips;
}

async function houseTurn() {
  gameStore.playerDone = true
  handStore.house[0].visible = true
  const houseInterval = setInterval(() => {
    if (gameStore.houseScore < gameStore.playerScore) {
      newCard(true, true)
    } else {
      clearInterval(houseInterval)
      if (gameStore.houseScore > 21) {
        gameStore.playerChips += gameStore.betChips * 2
      } else if (gameStore.houseScore === gameStore.playerScore) {
        gameStore.playerChips += gameStore.betChips;
      }
      gameStore.roundDone = true;
    }
  }, 1_000)
}

onMounted(() => {
  resetGame(false)
})

watchEffect(() => {
  console.log("playerScore: " + gameStore.playerScore)
  if (gameStore.playerScore >= 21 && !gameStore.roundDone) {
    if (gameStore.playerScore === 21) {
      gameStore.playerChips += gameStore.betChips * 2
    }
    resetGame(false)
  }
  if (gameStore.playerChips < gameStore.betChips && gameStore.roundDone) {
    gameStore.gameDone = true;
  }
})

</script>

<template>
  <div class="py-10 flex flex-col">
    <CardRow :card_list="handStore.house" :house="true" />
    <div class="text-white font-semibold basis-64 flex flex-row justify-center">
      <div
        class="flex flex-col self-center justify-center align-middle gap-2 h-3/5 px-10 bg-neutral-900/90 border border-black rounded-2xl"
        v-if="!gameStore.roundDone">
        <button class="px-2 py-1.5 rounded-md bg-neutral-800 w-20 mx-auto" :onclick="() => {
          if (!gameStore.playerDone) {
            newCard(true, false)
          }
        }">hit</button>
        <button class="px-2 py-1.5 rounded-md bg-neutral-800 w-20 mx-auto" :onclick="() => {
          if (!gameStore.playerDone) {
            houseTurn()
          }
        }">hold</button>
      </div>
      <div
        class="flex flex-col self-center justify-center align-middle gap-2 h-3/5 px-10 bg-neutral-900/90 border border-black rounded-2xl"
        v-else>
        <button class="px-2 py-1.5 rounded-md bg-neutral-800 w-20 mx-auto" :onclick="() => {
          resetGame(true)
        }">Start</button>
      </div>
    </div>
    <CardRow :card_list="handStore.player" :house="false" />
    <p class="text-white text-lg">${{ gameStore.playerChips }}</p>
  </div>
</template>
