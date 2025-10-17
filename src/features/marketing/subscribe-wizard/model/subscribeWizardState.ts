export type SubscribeWizardStep = 'email' | 'confirm' | 'success'

export type SubscribeWizardState = {
  step: SubscribeWizardStep
  email: string
  error?: string
  message?: string
}

export const subscribeWizardInitialState: SubscribeWizardState = {
  step: 'email',
  email: '',
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

