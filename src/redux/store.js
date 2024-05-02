import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { filtersReducer } from './filters/filtersSlice';
// import { contactsReducer } from './contacts/contactsSlice';
// import { filtersReducer } from './filters/filtersSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});
export default store;
