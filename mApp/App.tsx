/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { store } from "./src/redux/redux/store";
import { Provider } from "react-redux";
import Index from "./src";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

export let persistor = persistStore(store);
// Data에 사용할 인터페이스 설정
// 이것은 React-native에 사용될 메인 함수
function App(): JSX.Element {
  return (
    // Provider Setting
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView>
          <Index />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
export default App;
