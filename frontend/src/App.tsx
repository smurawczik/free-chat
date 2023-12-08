import { ChatView } from "./components/ChatView/components/ChatView";
import { Layout } from "./components/Layout/components/Layout";
import { LeftNavigation } from "./components/LeftNavigation";
import { RightNavigation } from "./components/RightNavigation";

function App() {
  return (
    <Layout>
      <LeftNavigation />
      <ChatView />
      <RightNavigation />
    </Layout>
  );
}

export default App;
