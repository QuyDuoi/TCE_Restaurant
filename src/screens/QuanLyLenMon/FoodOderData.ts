export type FoodOrder = {
    id: number;
    name: string;
    quantity: number;
    area: string;
    status: boolean;
    imageUrl: string;
  };
  
  export const sampleFoodOrders: FoodOrder[] = [
    { id: 1, name: 'Cơm thập cẩm', quantity: 7, area: 'Khu 1', status: false, imageUrl: 'https://s.net.vn/Yuyt' },
    { id: 2, name: 'Cơm rang', quantity: 7, area: 'Khu 2', status: false, imageUrl: 'https://s.net.vn/Yuyt' },
    { id: 3, name: 'Cơm thập cẩm', quantity: 7, area: 'Khu 3', status: false, imageUrl: 'https://s.net.vn/Yuyt' },
    { id: 4, name: 'Cơm rang', quantity: 7, area: 'Khu 4', status: false, imageUrl: 'https://s.net.vn/Yuyt' },
    { id: 5, name: 'Cơm thập cẩm', quantity: 7, area: 'Khu 5', status: true, imageUrl: 'https://s.net.vn/Yuyt' },
  ];
  