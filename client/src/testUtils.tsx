import AppStore from "./stores/app";
import { PropsWithChildren } from "react";
import AppContext from "./context";
import AppApi from "./api/app";
import { render } from "@testing-library/react";

export const renderWithMobx = ({
  children,
  appStore,
}: PropsWithChildren<{ appStore: AppStore }>) => {
  const api = new AppApi(appStore, "/");

  return render(
    <AppContext.Provider value={{ store: appStore, api }}>
      {children}
    </AppContext.Provider>
  );
};
