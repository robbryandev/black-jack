import { reactive } from "vue";

export const gameStore = reactive({
  playerScore: 0,
  houseScore: 0,
  playerChips: 0,
  betChips: 10,
  baseChips: 100,
  playerDone: false,
  roundDone: false,
  gameDone: true
})