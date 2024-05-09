import { reactive } from "vue";

export const gameStore = reactive({
  playerScore: 0,
  houseScore: 0,
  done: false
})