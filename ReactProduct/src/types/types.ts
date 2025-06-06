export interface Phone {
    id: string;
    name: string;
    brand?: string;
    price: number;
    quantity: number; 
    oldPrice?: number;
    currency?: string;
    description?: string;
    imageUrl?: string;
    installment?: number;
    installmentCount?: number;
    specs?: {
        screen: string;
        processor: string;
        ram: string;
        storage: string;
        camera: string;
    };
}
