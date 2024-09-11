import { Donation } from '@interfaces/donation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DonationState {
  value: Donation[];
}

const initialState: DonationState = {
  value: [],
};

export const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Donation[]>) => {
      state.value = action.payload;
    },
  },
});

export const { update } = donationSlice.actions;
export default donationSlice.reducer;
