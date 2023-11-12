import AppContext from "./context";
import AppStore from "./stores/app";
import AppApi from "./api/app";
import PageRoutes from "./routes";

const store = new AppStore();
const api = new AppApi(store);

function App() {
  return (
    <AppContext.Provider value={{ store, api }}>
      <PageRoutes />
    </AppContext.Provider>
  );
}

export default App;
