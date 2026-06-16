export interface Order {
  id?: string
  number: string
  status: 'PENDIENTE' | 'PAGADA' | 'CANCELADA'
  tableId: string
}
