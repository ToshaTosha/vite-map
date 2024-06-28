<template>
  <form class="w-100 flex justify-between items-center" @submit="onLoginSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem v-auto-animate>
        <FormControl>
          <Input type="text" placeholder="Логин" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="m-2">
      Найти
    </Button>
  </form>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

const formSchema = toTypedSchema(z.object({
  username: z.string({ message: 'Пожалуйста, заполните это поле' }).nonempty({ message: 'Пожалуйста, заполните это поле' }),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onLoginSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

