import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import "@/styles/global-styles.scss";
import type { AppProps } from "next/app";
import { Fetcher, SWRConfig } from "swr";
import { Provider } from "react-redux";
import Offconvases from "@/common/components/Offconvases";
import { wrapper } from "@/common/redux/store";
import { ToastContainer } from "react-toastify";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const swrFetcher = async (resource: string, init: any) => {
  const res = await fetch(resource, init);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // @ts-ignore
    error.info = await res.json();
    // @ts-ignore
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function App({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  const layout = getLayout(<Component {...props.pageProps} />);

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          refreshInterval: 0,
          revalidateOnFocus: false,
          fetcher: (resource, init) => swrFetcher(resource, init),
        }}
      >
        <ToastContainer
          position='bottom-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
        <Offconvases />
        {layout}
      </SWRConfig>
    </Provider>
  );
}

export default App;
