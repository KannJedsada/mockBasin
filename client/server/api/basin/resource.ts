export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let id = query.id || ''
  if (Array.isArray(id)) id = id[0]
  id = String(id)
  if (!id) {
    return { error: 'กรุณาระบุ id ใน query string' }
  }
  const url = `https://wapt.onwr.go.th/info/api/water-resource/basin?id=${encodeURIComponent(
    id,
  )}`
  const res = await fetch(url)
  if (!res.ok) {
    return { error: 'ไม่สามารถดึงข้อมูลจาก API ได้', status: res.status }
  }
  const data = await res.json()
  return data
})
