<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import { useToast } from 'primevue/usetoast'
import { t } from '@/i18n/de'

/**
 * Shared form-fields component used by both ClaimCheckModal (desktop dialog)
 * and InlineClaimSection (mobile page-flow). Manages its own field state,
 * validation, shake animation, and toast. Does NOT render a submit button —
 * the parent provides one and calls `submitForm()` via template ref.
 * The parent also resets the form on close via `reset()`.
 *
 * `formId` disambiguates input `id`/`name` attrs when both instances exist
 * in the DOM simultaneously (modal hidden on mobile, inline hidden on desktop).
 */
const props = withDefaults(defineProps<{
  formId?: string
}>(), {
  formId: 'gw',
})

const emit = defineEmits<{
  (e: 'success'): void
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[+]?[\d\s\-/().]{6,20}$/

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

const formData = ref<GatewayFormData>({ ...emptyForm })
const errors = ref<Partial<Record<keyof GatewayFormData, string>>>({})
const shakingFields = ref<(keyof GatewayFormData)[]>([])
const toast = useToast()

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
  if (formData.value.companyName.trim()) entries.company = formData.value.companyName.trim()
  if (formData.value.notes.trim()) entries.notes = formData.value.notes.trim()
  return `${externalFormUrl}?${new URLSearchParams(entries).toString()}`
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

const submitForm = () => {
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
  emit('success')
}

const reset = () => {
  formData.value = { ...emptyForm }
  errors.value = {}
  shakingFields.value = []
}

defineExpose({ submitForm, reset })
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-5" novalidate>

    <!-- Section: Contact -->
    <fieldset>
      <legend class="text-base font-display font-bold text-rex-orange mb-3 border-b border-gray-200 pb-1 pt-2">
        {{ t.modal.sectionContact }}
      </legend>
      <div class="space-y-3">
        <!-- Name -->
        <div :class="{ 'field-shake': shakingFields.includes('name') }">
          <label :for="`${formId}-name`" class="block text-sm font-semibold text-gray-800 mb-1">
            {{ t.modal.name }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
          </label>
          <InputText
            :id="`${formId}-name`"
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
          <label :for="`${formId}-email`" class="block text-sm font-semibold text-gray-800 mb-1">
            {{ t.modal.email }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
          </label>
          <InputText
            :id="`${formId}-email`"
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
          <label :for="`${formId}-phone`" class="block text-sm font-semibold text-gray-800 mb-1">
            {{ t.modal.phone }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
          </label>
          <InputText
            :id="`${formId}-phone`"
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
          <label :for="`${formId}-machine`" class="block text-sm font-semibold text-gray-800 mb-1">
            {{ t.modal.machineType }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
          </label>
          <InputText
            :id="`${formId}-machine`"
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
          <label :for="`${formId}-age`" class="block text-sm font-semibold text-gray-800 mb-1">
            {{ t.modal.machineAge }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
          </label>
          <Select
            :id="`${formId}-age`"
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
                :name="`${formId}-service`"
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
                :name="`${formId}-parts`"
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
                :name="`${formId}-issues`"
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
          <label :for="`${formId}-company`" class="block text-sm font-semibold text-gray-800 mb-1">
            {{ t.modal.companyName }}
          </label>
          <InputText
            :id="`${formId}-company`"
            v-model="formData.companyName"
            autocomplete="organization"
            class="w-full"
            :placeholder="t.modal.companyNamePlaceholder"
          />
        </div>
        <!-- Notes -->
        <div>
          <label :for="`${formId}-notes`" class="block text-sm font-semibold text-gray-800 mb-1">
            {{ t.modal.notes }}
          </label>
          <Textarea
            :id="`${formId}-notes`"
            v-model="formData.notes"
            rows="2"
            class="w-full"
            :placeholder="t.modal.notesPlaceholder"
          />
        </div>
      </div>
    </fieldset>

  </form>
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
