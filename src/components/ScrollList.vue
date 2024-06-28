<template>
  <ScrollArea class="h-72 w-100 rounded-md border">
    <div class="p-4">
      <div v-for="tag in tags" :key="tag">
        <div class="text-sm">
          {{ tag }}
        </div>
        <Separator class="my-2" />
      </div>
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `vpn${a.length - i}`,
)

console.log(tags, 'tags')
</script>