<template>
  <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
      <AccordionTrigger><div class="w-4 h-4 mr-4 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold"></div>
        {{ item.title }}</AccordionTrigger>
      <AccordionContent>
        <ScrollList />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ScrollList from '@/components/ScrollList.vue'
import { Badge } from '@/components/ui/badge'

const defaultValue = 'item-1'

const accordionItems = [
  { value: 'item-1', title: 'Активные сессии' },
  { value: 'item-2', title: 'Неактивные сессии' },
  { value: 'item-3', title: 'Заблокированные клиенты' },
]
</script>