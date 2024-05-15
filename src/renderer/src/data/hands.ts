import { reactive } from 'vue'
import type { CardSettings } from '../components/Game.vue'

export const handStore = reactive({
  player: [] as CardSettings[],
  house: [] as CardSettings[]
})