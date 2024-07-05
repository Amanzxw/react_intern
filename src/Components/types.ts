
export interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
    selected: boolean;
  }
  
  export interface SubDepartment {
    id: number;
    name: string;
    selected: boolean;
  }
  