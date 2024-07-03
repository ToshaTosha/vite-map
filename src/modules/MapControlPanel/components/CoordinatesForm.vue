<template>
  <form class="w-100" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="id">
      <FormItem v-auto-animate>
        <FormControl>
          <Input disabled type="text" placeholder="Id" v-bind="componentField" class="mt-2" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="longitude">
      <FormItem v-auto-animate>
        <FormControl>
          <Input type="number" step="any" placeholder="Долгота" v-bind="componentField" class="mt-2" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="latitude">
      <FormItem v-auto-animate>
        <FormControl>
          <Input type="number" step="any" placeholder="Широта" v-bind="componentField" class="my-2" />
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
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStore } from 'vuex'
import { ClientsApi } from '@/modules/MapControlPanel/api/ClientsApi'
import { UpdateClientData } from '@/modules/MapControlPanel/api/ClientsApi'

const { getters } = useStore()
const currentEditClient = getters.getCurrentEditClient

const initialValues = {
  id: currentEditClient?.id || null,
  longitude: currentEditClient?.longitude || 0,
  latitude: currentEditClient?.latitude || 0,
}

const formSchema = toTypedSchema(z.object({
  id: z.number({ message: 'Пустым id не может быть пустым' }).min(1, { message: 'Пустым id не может быть пустым' }),
  longitude: z.number({ message: 'Зполните поле' }).gte(-180, { message: 'Значение должно быть не меньше -180' }).lte(180, { message: 'Значение должно быть не больше 180' }),
  latitude: z.number({ message: 'Зполните поле' }).gte(-90, { message: 'Значение должно быть не меньше -90' }).lte(90, { message: 'Значение должно быть не больше 90' }),
}))

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues,
})

watch(() => getters.getCurrentEditClient, (newValue) => {
  setFieldValue("id", newValue.id)
  setFieldValue("longitude", newValue.longitude)
  setFieldValue("latitude", newValue.latitude)
})

const onSubmit = handleSubmit((values: UpdateClientData) => {
  const api = new ClientsApi()
  api.updateClients(values)
})
</script>
