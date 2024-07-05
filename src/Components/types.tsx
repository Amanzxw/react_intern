
export interface UserDetails {
    name: string;
    phone: string;
    email: string;
  }
  
  export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export interface Department {
    name: string;
    subDepartments: string[];
  }
  