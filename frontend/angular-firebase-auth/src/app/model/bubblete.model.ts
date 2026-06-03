export interface BubbleTea {
   id: string;
   name: string;
   flavor: string;
   price: number;
   stock?: number;
   descripcion?: string;
   favorite?: boolean;
}

export interface BubbleTeaPayload {
   nombre: string;
   tipo_bubbletea: string;
   descripcion?: string;
   precio: number;
   stock: number;
   active: boolean;
}