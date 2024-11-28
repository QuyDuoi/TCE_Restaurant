import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ChiTietMon {
  id_monAn: string;
  soLuongMon: number;
  tenMon: string;
  giaTien: number;
}

interface ChiTietMonState {
  chiTietMons: ChiTietMon[];
  status: 'onUpdate' | 'idle';
}

const initialState: ChiTietMonState = {
  chiTietMons: [],
  status: 'idle',
};

const chiTietMonSlice = createSlice({
  name: 'chiTietMon',
  initialState,
  reducers: {
    addOrUpdate: (
      state,
      action: PayloadAction<{
        id_monAn: string;
        soLuongMon: number;
        tenMon: string;
        giaTien: number;
      }>,
    ) => {
      const {id_monAn, soLuongMon, tenMon, giaTien} = action.payload;
      const existing = state.chiTietMons.find(
        item => item.id_monAn === id_monAn,
      );
      if (existing) {
        existing.soLuongMon = soLuongMon;
        existing.giaTien = giaTien;
      } else if (soLuongMon > 0) {
        state.chiTietMons.push({
          id_monAn,
          soLuongMon,
          tenMon,
          giaTien: giaTien,
        });
      }

      state.chiTietMons = state.chiTietMons.filter(item => item.soLuongMon > 0);
      state.status = 'onUpdate';
    },
    clearChiTiet: state => {
      state.chiTietMons = [];
      state.status = 'idle';
    },
  },
});

export const {addOrUpdate, clearChiTiet} = chiTietMonSlice.actions;
export default chiTietMonSlice.reducer;
