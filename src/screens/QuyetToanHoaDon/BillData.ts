export type BillData = {
    id: number;
    area: string;
    timeIn: string;
    total: string;
    duration: string;
  };
  
  export const sampleData: BillData[] = [
    { id: 1, area: 'Bàn 4 - Tầng 2', timeIn: '12:00 | 29/10/2024', total: '500.000đ', duration: '01:45' },
    { id: 2, area: 'Bàn 5 - Tầng 1', timeIn: '13:00 | 20/10/2024', total: '300.000đ', duration: '01:30' },
    { id: 3, area: 'Bàn 6 - Tầng 1', timeIn: '14:00 | 20/10/2024', total: '450.000đ', duration: '02:00' },
    { id: 4, area: 'Bàn 7 - Tầng 1', timeIn: '15:00 | 20/10/2024', total: '400.000đ', duration: '01:15' },
    { id: 5, area: 'Bàn 8 - Tầng 1', timeIn: '16:00 | 20/10/2024', total: '600.000đ', duration: '01:50' },
  ];
  