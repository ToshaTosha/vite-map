<template>
    <form class="w-100" @submit="onLoginSubmit">
      <FormField v-slot="{ componentField }" name="long">
        <FormItem v-auto-animate>
          <FormControl>
            <Input type="number" placeholder="Долгота" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lat">
        <FormItem v-auto-animate>
          <FormControl>
            <Input type="number" placeholder="Широта" v-bind="componentField" class="my-2" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        Сохранить
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
    long: z.number({ message: 'Зполните поле' }).gte(-180, { message: 'Значение должно быть не меньше -180' }).lte(180, { message: 'Значение должно быть не больше 180' }),
    lat: z.number({ message: 'Зполните поле' }).gte(-90, { message: 'Значение должно быть не меньше -90' }).lte(90, { message: 'Значение должно быть не больше 90' }),
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
  