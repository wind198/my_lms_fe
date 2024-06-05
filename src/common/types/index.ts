export type IHasId = {
  id: number
}

export type IPagination = {
  page: number
  pageSize: number
}

export type IPaginatedData<T> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
