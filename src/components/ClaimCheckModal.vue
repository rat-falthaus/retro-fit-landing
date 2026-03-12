<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { t } from '@/i18n/de'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

interface GatewayFormData {
  name: string
  email: string
  phone: string
  machineType: string
  machineAge: string
  servicePartner: string
  spareParts: string
  recentIssues: string
  companyName: string
  notes: string
}

type ModalStep = 'input' | 'opened'

const step = ref<ModalStep>('input')

const errors = ref<Partial<Record<keyof GatewayFormData, string>>>({})

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[+]?[\d\s\-/().]{6,20}$/

const formData = ref<GatewayFormData>({
  name: '',
  email: '',
  phone: '',
  machineType: '',
  machineAge: '',
  servicePartner: '',
  spareParts: '',
  recentIssues: '',
  companyName: '',
  notes: '',
})

const externalFormUrl = 'https://rex-at.de/landingpage-retrofit.html'

const buildPrefillUrl = (): string => {
  const entries: Record<string, string> = {
    name: formData.value.name.trim(),
    email: formData.value.email.trim(),
    tel: formData.value.phone.trim(),
    machine: formData.value.machineType.trim(),
    age: formData.value.machineAge,
    service: formData.value.servicePartner,
    parts: formData.value.spareParts,
    issues: formData.value.recentIssues,
  }
  if (formData.value.companyName.trim()) {
    entries.company = formData.value.companyName.trim()
  }
  if (formData.value.notes.trim()) {
    entries.notes = formData.value.notes.trim()
  }
  const params = new URLSearchParams(entries)
  return `${externalFormUrl}?${params.toString()}`
}

const validate = (): boolean => {
  const e: Partial<Record<keyof GatewayFormData, string>> = {}

  if (!formData.value.name.trim()) e.name = 'Pflichtfeld'

  if (!formData.value.email.trim()) {
    e.email = 'Pflichtfeld'
  } else if (!EMAIL_REGEX.test(formData.value.email.trim())) {
    e.email = 'Bitte gültige E-Mail-Adresse eingeben'
  }

  if (!formData.value.phone.trim()) {
    e.phone = 'Pflichtfeld'
  } else if (!PHONE_REGEX.test(formData.value.phone.trim())) {
    e.phone = 'Bitte gültige Telefonnummer eingeben'
  }

  if (!formData.value.machineType.trim()) e.machineType = 'Pflichtfeld'
  if (!formData.value.machineAge) e.machineAge = 'Pflichtfeld'
  if (!formData.value.servicePartner) e.servicePartner = 'Pflichtfeld'
  if (!formData.value.spareParts) e.spareParts = 'Pflichtfeld'
  if (!formData.value.recentIssues) e.recentIssues = 'Pflichtfeld'

  errors.value = e
  return Object.keys(e).length === 0
}

const toast = useToast()
const shakingFields = ref<(keyof GatewayFormData)[]>([])

const handleSubmit = () => {
  if (!validate()) {
    shakingFields.value = Object.keys(errors.value) as (keyof GatewayFormData)[]
    setTimeout(() => { shakingFields.value = [] }, 600)
    toast.add({
      severity: 'warn',
      summary: t.modal.validationToastTitle,
      detail: t.modal.validationToastDetail,
      life: 4000,
    })
    return
  }
  window.open(buildPrefillUrl(), '_blank', 'noopener,noreferrer')
  step.value = 'opened'
}

const emptyForm: GatewayFormData = {
  name: '',
  email: '',
  phone: '',
  machineType: '',
  machineAge: '',
  servicePartner: '',
  spareParts: '',
  recentIssues: '',
  companyName: '',
  notes: '',
}

const closeDialog = () => {
  emit('update:visible', false)
  setTimeout(() => {
    step.value = 'input'
    formData.value = { ...emptyForm }
    errors.value = {}
  }, 300)
}
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="closeDialog"
    modal
    :closable="true"
    :style="{ width: '95vw', maxWidth: '640px', maxHeight: '90vh' }"
    :pt="{
      root: 'rounded-2xl overflow-hidden flex flex-col',
      header: 'bg-rex-dark text-white p-5 shrink-0',
      content: 'p-6 overflow-y-auto bg-white flex-1 min-h-0',
      footer: 'px-6 py-4 bg-white border-t border-gray-200 shrink-0',
    }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-industrial-amber rounded-lg flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-display font-bold">{{ t.modal.title }}</h2>
          <p class="text-white/90 text-sm">{{ t.modal.subtitle }}</p>
        </div>
      </div>
    </template>

    <!-- Step: opened (success/redirect confirmation) -->
    <div v-if="step === 'opened'" class="text-center py-8 space-y-4">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-2xl font-display font-bold text-forest-green">{{ t.modal.openedTitle }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">{{ t.modal.openedText }}</p>
      <p class="text-xs text-gray-500">
        {{ t.modal.openedFallback }}
        <a
          :href="externalFormUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-rex-orange font-semibold underline hover:text-rex-orange-dark ml-1"
        >{{ t.modal.openedFallbackLink }}</a>
      </p>
      <Button
        :label="t.modal.openedClose"
        class="btn-primary mt-2"
        @click="closeDialog"
      />
    </div>

    <!-- Step: input (full gateway form) -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-5" novalidate>

      <!-- Section: Contact -->
      <fieldset>
        <legend class="text-base font-display font-bold text-rex-orange mb-3 border-b border-gray-200 pb-1 pt-2">
          {{ t.modal.sectionContact }}
        </legend>
        <div class="space-y-3">
          <!-- Name -->
          <div :class="{ 'field-shake': shakingFields.includes('name') }">
            <label for="gw-name" class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.name }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </label>
            <InputText
              id="gw-name"
              v-model="formData.name"
              autocomplete="name"
              class="w-full"
              :placeholder="t.modal.namePlaceholder"
              :invalid="!!errors.name"
              required
            />
            <small v-if="errors.name" class="text-red-500 text-xs mt-1 block">{{ errors.name }}</small>
          </div>
          <!-- Email -->
          <div :class="{ 'field-shake': shakingFields.includes('email') }">
            <label for="gw-email" class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.email }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </label>
            <InputText
              id="gw-email"
              v-model="formData.email"
              type="email"
              autocomplete="email"
              class="w-full"
              :placeholder="t.modal.emailPlaceholder"
              :invalid="!!errors.email"
              required
            />
            <small v-if="errors.email" class="text-red-500 text-xs mt-1 block">{{ errors.email }}</small>
          </div>
          <!-- Phone -->
          <div :class="{ 'field-shake': shakingFields.includes('phone') }">
            <label for="gw-phone" class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.phone }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </label>
            <InputText
              id="gw-phone"
              v-model="formData.phone"
              type="tel"
              autocomplete="tel"
              class="w-full"
              :placeholder="t.modal.phonePlaceholder"
              :invalid="!!errors.phone"
              required
            />
            <small v-if="errors.phone" class="text-red-500 text-xs mt-1 block">{{ errors.phone }}</small>
          </div>
        </div>
      </fieldset>

      <!-- Section: Machine -->
      <fieldset>
        <legend class="text-base font-display font-bold text-rex-orange mb-3 border-b border-gray-200 pb-1">
          {{ t.modal.sectionMachine }}
        </legend>
        <div class="space-y-3">
          <!-- Machine Type -->
          <div :class="{ 'field-shake': shakingFields.includes('machineType') }">
            <label for="gw-machine" class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.machineType }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </label>
            <InputText
              id="gw-machine"
              v-model="formData.machineType"
              class="w-full"
              :placeholder="t.modal.machineTypePlaceholder"
              :invalid="!!errors.machineType"
              required
            />
            <small v-if="errors.machineType" class="text-red-500 text-xs mt-1 block">{{ errors.machineType }}</small>
          </div>
          <!-- Machine Age -->
          <div :class="{ 'field-shake': shakingFields.includes('machineAge') }">
            <label for="gw-age" class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.machineAge }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </label>
            <Select
              id="gw-age"
              v-model="formData.machineAge"
              :options="[...t.modal.machineAgeOptions]"
              optionLabel="label"
              optionValue="value"
              class="w-full"
              :invalid="!!errors.machineAge"
              required
            />
            <small v-if="errors.machineAge" class="text-red-500 text-xs mt-1 block">{{ errors.machineAge }}</small>
          </div>
          <!-- Service Partner -->
          <div :class="{ 'field-shake': shakingFields.includes('servicePartner') }">
            <span class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.servicePartner }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </span>
            <div class="flex gap-4">
              <label
                v-for="opt in t.modal.servicePartnerOptions"
                :key="opt.value"
                class="flex items-center gap-2 cursor-pointer text-sm text-gray-800"
              >
                <input
                  type="radio"
                  name="gw-service"
                  :value="opt.value"
                  v-model="formData.servicePartner"
                  class="accent-rex-orange"
                />
                {{ opt.label }}
              </label>
            </div>
            <small v-if="errors.servicePartner" class="text-red-500 text-xs mt-1 block">{{ errors.servicePartner }}</small>
          </div>
          <!-- Spare Parts -->
          <div :class="{ 'field-shake': shakingFields.includes('spareParts') }">
            <span class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.spareParts }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </span>
            <div class="flex gap-4">
              <label
                v-for="opt in t.modal.sparePartsOptions"
                :key="opt.value"
                class="flex items-center gap-2 cursor-pointer text-sm text-gray-800"
              >
                <input
                  type="radio"
                  name="gw-parts"
                  :value="opt.value"
                  v-model="formData.spareParts"
                  class="accent-rex-orange"
                />
                {{ opt.label }}
              </label>
            </div>
            <small v-if="errors.spareParts" class="text-red-500 text-xs mt-1 block">{{ errors.spareParts }}</small>
          </div>
          <!-- Recent Issues -->
          <div :class="{ 'field-shake': shakingFields.includes('recentIssues') }">
            <span class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.recentIssues }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
            </span>
            <div class="flex gap-4">
              <label
                v-for="opt in t.modal.recentIssuesOptions"
                :key="opt.value"
                class="flex items-center gap-2 cursor-pointer text-sm text-gray-800"
              >
                <input
                  type="radio"
                  name="gw-issues"
                  :value="opt.value"
                  v-model="formData.recentIssues"
                  class="accent-rex-orange"
                />
                {{ opt.label }}
              </label>
            </div>
            <small v-if="errors.recentIssues" class="text-red-500 text-xs mt-1 block">{{ errors.recentIssues }}</small>
          </div>
        </div>
      </fieldset>

      <!-- Section: Optional -->
      <fieldset>
        <legend class="text-base font-display font-bold text-gray-500 mb-3 border-b border-gray-200 pb-1">
          {{ t.modal.sectionOptional }}
        </legend>
        <div class="space-y-3">
          <!-- Company -->
          <div>
            <label for="gw-company" class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.companyName }}
            </label>
            <InputText
              id="gw-company"
              v-model="formData.companyName"
              autocomplete="organization"
              class="w-full"
              :placeholder="t.modal.companyNamePlaceholder"
            />
          </div>
          <!-- Notes -->
          <div>
            <label for="gw-notes" class="block text-sm font-semibold text-gray-800 mb-1">
              {{ t.modal.notes }}
            </label>
            <Textarea
              id="gw-notes"
              v-model="formData.notes"
              rows="2"
              class="w-full"
              :placeholder="t.modal.notesPlaceholder"
            />
          </div>
        </div>
      </fieldset>

    </form>

    <template v-if="step === 'input'" #footer>
      <Button
        type="button"
        :label="t.modal.submit"
        class="w-full btn-primary py-4 text-base font-bold"
        @click="handleSubmit"
      />
      <p class="text-xs text-gray-500 text-center mt-3">{{ t.modal.privacyNote }}</p>
    </template>
  </Dialog>
</template>

<style scoped>
@keyframes field-shake {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-5px); }
  30%       { transform: translateX(4px); }
  50%       { transform: translateX(-3px); }
  70%       { transform: translateX(2px); }
  85%       { transform: translateX(-1px); }
}
.field-shake {
  animation: field-shake 0.5s ease-in-out;
}
</style>
