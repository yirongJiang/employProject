export const outcomes = async (func, params) => {
    const result = await func(params)
    return result
  }