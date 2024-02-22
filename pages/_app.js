import Layout from '@/components/Layout';
import '@/styles/globals.css'
import store from '@/redux/store';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/components/ErrorBoundary';
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  </Provider>
  );
}
