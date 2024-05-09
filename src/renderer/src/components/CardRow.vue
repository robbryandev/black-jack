<script setup lang="ts">
import { defineComponent } from 'vue';
import type { CardSettings } from '@renderer/App.vue';
import Card from './Card.vue';

const props = defineProps<{
  card_list: CardSettings[]
}>();

defineComponent({
  "name": "CardRow"
});

</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap justify-start">
      <Card v-for="card in props.card_list" :visible="card.visible" :card_path="card.path" />
    </div>
  </div>
</template>