export type BusinessExceptionDetail = {
  field?: string
  code: string
  message: string
}

export class BusinessException {
  status: number
  title: string
  errors: BusinessExceptionDetail[]

  constructor(status: number, title: string, errors: BusinessExceptionDetail[]) {
    this.status = status
    this.title = title
    this.errors = errors
  }
}
