import { Component, createContext, useContext } from 'solid-js';
import { useRouteData } from 'solid-app-router';
import { ResourceMetadata } from '@solid.js/docs';

interface AppContextInterface {
  isDark: boolean;
  loading: boolean;
  guidesSupported: boolean;
  guides: ResourceMetadata[] | undefined;
}

const AppContext = createContext<AppContextInterface>({
  isDark: false,
  loading: true,
  guidesSupported: false,
  guides: undefined,
});

export const AppContextProvider: Component<{}> = (props) => {
  const data = useRouteData<AppContextInterface>();
  return <AppContext.Provider value={data}>{props.children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
