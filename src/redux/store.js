import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/slice';
import { filtersReducer } from './filters/slice';
import { authReducer } from './auth/slice';
// import { contactsReducer } from './contacts/contactsSlice';
// import { filtersReducer } from './filters/filtersSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
});
export default store;
