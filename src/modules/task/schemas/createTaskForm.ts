import * as v from 'valibot'

export const createTaskFormSchema = v.object({
  title: v.pipe(v.string(), v.minLength(3, 'Минимум 3 символа')),
  description: v.union([v.literal(''), v.pipe(v.string(), v.minLength(3, 'Минимум 3 символа'))]),
  priority: v.picklist(['LOW', 'MEDIUM', 'HIGH']),
})
