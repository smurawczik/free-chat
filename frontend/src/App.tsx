import { Chat } from "./components/Chat";
import { Layout } from "./components/Layout/components/Layout";
import { LeftNavigation } from "./components/LeftNavigation";
import { NoChat } from "./components/NoChat";
import { RightNavigation } from "./components/RightNavigation";

function App() {
  return (
    <Layout>
      <LeftNavigation />
      <NoChat />
      <Chat />
      <RightNavigation />
    </Layout>
  );
}

export default App;
