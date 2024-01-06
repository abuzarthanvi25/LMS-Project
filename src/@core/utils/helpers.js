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
