<template>
  <div class="justify-center max-w-md my-10">
    <h1 class="font-extrabold tracking-tigh text-3xl leading-10">Converter</h1>

    <Block
      v-for="block in blocksKeys"
      v-bind:key="block"
      v-on:close="removeBlock(block)"
    />

    <div
      class="group inline-block text-primary hover:text-primary-hover mx-auto cursor-pointer"
      v-on:click="addBlock"
    >
      <IconPlus class="group-hover:animate-bounce" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Block from '../components/block.vue'
import IconPlus from '../components/icons/plus.vue'

const blocksKeys = reactive(['block0'] as string[])

let lastBlockNo = 1
function addBlock() {
  // eslint-disable-next-line no-plusplus
  blocksKeys.push(`block${lastBlockNo++}`)
}

function removeBlock(id: string) {
  const index = blocksKeys.indexOf(id)
  blocksKeys.splice(index, 1)
}
</script>
