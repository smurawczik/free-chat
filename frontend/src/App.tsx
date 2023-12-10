import { AppLoading } from "./components/AppLoading";
import { ChatView } from "./components/ChatView/components/ChatView";
import { Layout } from "./components/Layout/components/Layout";
import { LeftNavigation } from "./components/LeftNavigation";
import { QuickUserCreate } from "./components/QuickUserCreate";
import { RightNavigation } from "./components/RightNavigation";
import { useAuth } from "./hooks/useAuth";
import { useAppSelector } from "./store/hooks";
import { authSelectors } from "./store/slices/auth/auth.slice.selectors";

function App() {
  useAuth({ initialFetch: true });

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
      <QuickUserCreate />
    </>
  );
}

export default App;
