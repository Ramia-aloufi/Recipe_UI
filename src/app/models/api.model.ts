export interface ApiResponse<T> {
    statusCode:number
    message: string | {}
    data?: T
    meta?: PaginationMeta;
  }
  
  interface PaginationMeta {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }