import { speedDialIconClasses } from '@mui/material'
import { z } from 'zod'

export const FormDataSchema = z.object({
  species: z.string().min(1, 'Required'),
  breed: z.string().min(1, 'Required'),
  activity_level: z.string().min(1, 'Required'),
  life_stage: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})