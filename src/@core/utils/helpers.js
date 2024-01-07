export const transformRoutesObject = originalObject => {
  const transformedObject = {}

  for (const role in originalObject) {
    if (originalObject.hasOwnProperty(role)) {
      const sections = originalObject[role]
      const routes = []

      for (const section of sections) {
        if ('path' in section) {
          routes.push(section.path)
        }
      }

      transformedObject[role] = routes
    }
  }

  return transformedObject
}

export const objectToFormData = obj => {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key])
    }
  }

  return formData
}
