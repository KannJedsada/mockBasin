export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Basin ID is required',
    })
  }

  try {
    const response = await fetch(
      `https://wapt.onwr.go.th/info/api/runoff/basin?id=${id}`,
    )

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Failed to fetch data from external API: ${response.statusText}`,
      })
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch basin data',
    })
  }
})
