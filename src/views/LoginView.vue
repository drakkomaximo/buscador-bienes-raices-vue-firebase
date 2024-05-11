<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema as validationSchema } from '@/validation/loginSchema'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()


const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(values => {
  authStore.login(values)
})
</script>

<template>
  <v-card flat max-width="600" class="mx-auto">
    <v-card-title class="text-h4 font-weight-bold text-center" tag="h3">
      Iniciar Sesión
    </v-card-title>
    <v-card-subtitle class="text-center text-h5">
      Iniciar Sesión con tu cuenta
    </v-card-subtitle>

    <v-alert v-if="authStore.hasError" color="error" icon="$error" title="Error al iniciar sesión"
      text="">{{ authStore.errorMsg }}</v-alert>

    <v-form>
      <v-card-text>
        <v-text-field label="Email" v-model="email.value.value" outlined required type="email"
          :error-messages="email.errorMessage.value"></v-text-field>
        <v-text-field label="Contraseña" v-model="password.value.value" outlined required type="password"
          :error-messages="password.errorMessage.value"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="pink-accent-3" @click="submit">
          Iniciar Sesión
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>