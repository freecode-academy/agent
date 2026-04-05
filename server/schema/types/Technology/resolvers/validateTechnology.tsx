interface TechnologyData {
  name?: string | null
  description?: string | null
  site_url?: string | null
  components?: unknown | null
  level1hours?: number | null
  level2hours?: number | null
  level3hours?: number | null
  level4hours?: number | null
  level5hours?: number | null
}

export const validateTechnology = (data: TechnologyData) => {
  if (data.name !== undefined) {
    if (!data.name) {
      throw new Error('Не заполнено название')
    }
  }

  return data
}
