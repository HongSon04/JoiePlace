import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./features/authentication/accountSlice";
import themeSlice from "./features/theme/themeSlice";
import requestsSlice from "./features/requests/requestsSlice";
import dishesSlice from "./features/dishes/dishesSlice";
import sidebarSlice from "./features/sidebar/sidebarSlice";

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    theme: themeSlice.reducer,
    requests: requestsSlice.reducer,
    dishes: dishesSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});

export default store;
