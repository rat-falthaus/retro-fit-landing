<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'submit', data: FormData): void
}>()

interface FormData {
  name: string
  email: string
  phone: string
  farmSize: string
  equipment: string
  message: string
}

const formData = ref<FormData>({
  name: '',
  email: '',
  phone: '',
  farmSize: '',
  equipment: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const closeDialog = () => {
  emit('update:visible', false)
  // Reset form after closing
  setTimeout(() => {
    isSuccess.value = false
    formData.value = {
      name: '',
      email: '',
      phone: '',
      farmSize: '',
      equipment: '',
      message: ''
    }
  }, 300)
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  emit('submit', formData.value)
  isSubmitting.value = false
  isSuccess.value = true
  
  // Close after showing success
  setTimeout(() => {
    closeDialog()
  }, 3000)
}

const isFormValid = () => {
  return formData.value.name && formData.value.email && formData.value.phone
}
</script>

<template>
  <Dialog 
    :visible="props.visible" 
    @update:visible="closeDialog"
    modal 
    :closable="!isSubmitting"
    :style="{ width: '90vw', maxWidth: '600px' }"
    :pt="{
      root: { class: 'rounded-2xl' },
      header: { class: 'bg-forest-green text-white rounded-t-2xl' },
      content: { class: 'p-6' }
    }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-industrial-amber rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-display font-bold">Claim Your Free Check</h2>
          <p class="text-white/90 text-sm">Worth €2,000 — No Obligation</p>
        </div>
      </div>
    </template>

    <!-- Success State -->
    <div v-if="isSuccess" class="text-center py-8">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-2xl font-display font-bold text-forest-green mb-2">Request Submitted!</h3>
      <p class="text-tech-slate mb-4">
        Our team will contact you within 24 hours to schedule your free assessment.
      </p>
      <p class="text-sm text-tech-slate/70">
        Check your email for confirmation details.
      </p>
    </div>

    <!-- Form State -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-semibold text-tech-slate mb-2">
          Full Name <span class="text-red-500">*</span>
        </label>
        <InputText 
          id="name"
          v-model="formData.name"
          class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
          placeholder="John Farmer"
          required
          :disabled="isSubmitting"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-semibold text-tech-slate mb-2">
          Email Address <span class="text-red-500">*</span>
        </label>
        <InputText 
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
          placeholder="john@farmexample.com"
          required
          :disabled="isSubmitting"
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-semibold text-tech-slate mb-2">
          Phone Number <span class="text-red-500">*</span>
        </label>
        <InputText 
          id="phone"
          v-model="formData.phone"
          type="tel"
          class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
          placeholder="+49 123 456 7890"
          required
          :disabled="isSubmitting"
        />
      </div>

      <!-- Farm Size -->
      <div>
        <label for="farmSize" class="block text-sm font-semibold text-tech-slate mb-2">
          Farm Size (hectares)
        </label>
        <InputText 
          id="farmSize"
          v-model="formData.farmSize"
          class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
          placeholder="e.g., 250"
          :disabled="isSubmitting"
        />
      </div>

      <!-- Equipment -->
      <div>
        <label for="equipment" class="block text-sm font-semibold text-tech-slate mb-2">
          Equipment Types
        </label>
        <InputText 
          id="equipment"
          v-model="formData.equipment"
          class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
          placeholder="e.g., 2 Harvesters, 1 Hay Baler"
          :disabled="isSubmitting"
        />
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-semibold text-tech-slate mb-2">
          Additional Information
        </label>
        <Textarea 
          id="message"
          v-model="formData.message"
          rows="3"
          class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none resize-none"
          placeholder="Tell us about your equipment or specific needs..."
          :disabled="isSubmitting"
        />
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <Button 
          type="submit"
          :disabled="!isFormValid() || isSubmitting"
          :loading="isSubmitting"
          class="w-full bg-industrial-amber hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          label="Submit Request"
        />
        <p class="text-xs text-tech-slate/70 text-center mt-3">
          By submitting, you agree to be contacted by our team. We respect your privacy.
        </p>
      </div>
    </form>
  </Dialog>
</template>
