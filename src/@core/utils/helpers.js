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

export const truncateString = (str = '', limit = 10) => {
  if (typeof str !== 'string') return

  if (str.length > limit) {
    return str.slice(0, limit) + '...';
  }

  return str;
}

export const getActiveIndex = (steps = []) => {
  const activeIndex = steps.findIndex((step) => step.active == true);

  if (activeIndex !== -1) {
    return activeIndex;
  }

  return 0;
}

export const areStepsCompleted = (steps = []) => steps.every((step) => step.completed == true)

export function handleNext(steps, setActiveStep) {
  let copySteps = [...steps];
  const activeIndex = getActiveIndex(steps);
  const nextIndex = activeIndex + 1;
  const completed = areStepsCompleted(copySteps)

  if (nextIndex < steps.length && !completed) {
    copySteps[activeIndex].active = false;
    copySteps[activeIndex].completed = true;

    copySteps[nextIndex].active = true;
    copySteps[nextIndex].completed = false;
    setActiveStep(copySteps);
  } else {
    if (!completed) {
      let arr = copySteps.map((step) => ({
        ...step,
        active: false,
        completed: true
      }))
      setActiveStep([...arr])
    }

  }
}

export function handleBack(steps, setActiveStep) {
  let copySteps = [...steps];
  const activeIndex = getActiveIndex(steps);
  const prevIndex = activeIndex - 1;

  const completed = areStepsCompleted(copySteps)

  if (prevIndex >= 0 && !completed) {
    steps[activeIndex].active = false;
    steps[activeIndex].completed = false;

    steps[prevIndex].active = true;
    steps[prevIndex].completed = false;
    setActiveStep(copySteps);
  }
}
