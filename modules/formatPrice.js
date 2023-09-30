export function formatPrice (value) {
  if (!value) { return 0 }
  const val = (value / 1).toFixed(0).replace('.', ',')
  return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
