
import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
// import initialContacts from '../data/contacts.json'
// import { nanoid } from 'nanoid'

// const initialState = initialContacts;

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    .addCase(addContact.pending, (state) => {
      state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
          const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});



// export const selectContacts = (state) => state.contacts.items;
// export const selectIsLoading = (state) => state.contacts.isLoading;
// export const selectError = (state) => state.contacts.error;

// export const selectFilterName = (state) => state.filters.name;

// export const selectFilteredContacts = createSelector(
//    // Масив вхідних селекторів
//   [selectContacts, selectFilterName],
//   // Функція перетворювач
//   (contacts, filterName) => {
//     // Виконуємо обчислення та повертаємо результат
//     const compareName = contacts.filter((contact) =>
//     contact.name.toLowerCase().includes(filterName.toLowerCase())
//     );
//     return compareName;
//   }
// )


export const contactsReducer = contactsSlice.reducer;

// export const { selectContacts } = contactsSlice.selectors;
// export const { addContact, deleteContact } = contactsSlice.actions;

  
