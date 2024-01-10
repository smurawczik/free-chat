import { AppLoading } from "./components/AppLoading";
import { ChatView } from "./components/ChatView/components/ChatView";
import { HookExecuter } from "./components/HookExecuter/HookExecuter";
import { Layout } from "./components/Layout/components/Layout";
import { LeftNavigation } from "./components/LeftNavigation";
import { QuickAccessDialog } from "./components/QuickAccessDialog";
import { RightNavigation } from "./components/RightNavigation";
import { useAppSelector } from "./store/hooks";
import { authSelectors } from "./store/slices/auth/auth.slice.selectors";

function App() {
  const authSuccess = useAppSelector(authSelectors.authIsSucceeded);
  const authLoading = useAppSelector(authSelectors.authIsLoading);

  return (
    <>
      <Layout>
        {authLoading ? (
          <AppLoading />
        ) : authSuccess ? (
          <>
            <LeftNavigation />
            <ChatView />
            <RightNavigation />
          </>
        ) : null}
      </Layout>
      <QuickAccessDialog />
      <HookExecuter />
    </>
  );
}

export default App;
