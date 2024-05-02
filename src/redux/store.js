import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/slice';
import { filtersReducer } from './filters/slice';
// import { contactsReducer } from './contacts/contactsSlice';
// import { filtersReducer } from './filters/filtersSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});
export default store;
