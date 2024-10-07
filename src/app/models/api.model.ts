export interface ApiResponse<T> {
    status:boolean
    message: string | {}
    data: T | null
    meta?: PaginationMeta;
  }
  
  interface PaginationMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }