import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

const selectFilterName = (state) => state.filters.name;


export const selectFilteredContacts = createSelector(
   // Масив вхідних селекторів
  [selectContacts, selectFilterName],
  // Функція перетворювач
  (contacts, filterName) => {
    // Виконуємо обчислення та повертаємо результат
    const compareName = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterName.toLowerCase())
    );
    return compareName;
  }
)