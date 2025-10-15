export interface Template {
    _id: string;
    title: string;
    status: string;
    user_id: {
      first_name: string;
      last_name: string;
    };
  }
  
  export interface Pagination {
    page: number;
    total_pages: number;
    total: number;
  }
  
  export interface TemplatesResponse {
    data: Array<Template>;
    pagination: Pagination;
  }
  
  export interface TemplateDetails {
    _id: string;
    title: string;
    status: string;
    user_id: {
      first_name: string;
      last_name: string;
    };
    created_at: string;
    updated_at: string;
  }
  
  export interface TemplateResponse {
    data: TemplateDetails;
  }