// testData.ts
export interface KhuVucModelTest {
    id: string;
    name: string;
    ban: BanModelTest[];
  }
  
  export interface BanModelTest {
    id: string;
    name: string;
    capacity: number;
    status: string | 'Trong' | 'Dang su dung' | 'Da dat';
    ghiChu: string | null;
  }
  
  export const testKhuVucData: KhuVucModelTest[] = [
    {
      id: '1',
      name: 'Tang 1',
      ban: [
        {
          id: '1',
          name: 'Ban 1',
          capacity: 4,
          status: 'Dang su dung',
          ghiChu: 'ghi chu ban 1',
        },
        {
          id: '2',
          name: 'Ban 2',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 2',
        },
        {
          id: '3',
          name: 'Ban 3',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 3',
        },
        {
          id: '4',
          name: 'Ban 4',
          capacity: 4,
          status: 'Dang su dung',
          ghiChu: 'ghi chu ban 4',
        },
        {
          id: '21',
          name: 'Ban 21',
          capacity: 4,
          status: 'Trong',
          ghiChu: 'ghi chu ban 4',
        },
      ],
    },
    {
      id: '2',
      name: 'Tang 2',
      ban: [
        {
          id: '5',
          name: 'Ban 1',
          capacity: 4,
          status: 'Dang su dung',
          ghiChu: 'ghi chu ban 1',
        },
        {
          id: '6',
          name: 'Ban 2',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 2',
        },
        {
          id: '7',
          name: 'Ban 3',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 3',
        },
      ],
    },
    {
      id: '3',
      name: 'Tang 3',
      ban: [],
    },
    {
      id: '4',
      name: 'Tang 4',
      ban: [
        {
          id: '8',
          name: 'Ban 1',
          capacity: 4,
          status: 'Dang su dung',
          ghiChu: 'ghi chu ban 1',
        },
        {
          id: '9',
          name: 'Ban 2',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 2',
        },
        {
          id: '10',
          name: 'Bàn',
          capacity: 4,
          status: 'Trong',
          ghiChu: 'ghi chu ban 3',
        },
      ],
    },
  ];
  