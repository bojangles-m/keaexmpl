import { kea } from 'kea';

export const logic = kea({
  actions: {
    increment: amount => ({ amount }),
    decrement: amount => ({ amount }),
    reset: true,
  },
  reducers: {
    counter: [
      0,
      {
        increment: (state, { amount }) => state + amount,
        decrement: (state, { amount }) => state - amount,
        reset: () => 0,
      },
    ],
  },
});
