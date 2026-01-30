export const pluralize = (
  count: number,
  forms: {
    zero?: string
    one: string
    two: string
    few: string
    many: string
    other?: string
  }
) => {
  const rule = new Intl.PluralRules('ru').select(count)
  return forms[rule as keyof typeof forms] ?? forms.many
}
