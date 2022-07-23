import { Disclosure } from "@headlessui/react";
import { useAccount, useChainId } from "@raydeck/usemetamask";
import React, {
  createContext,
  FC,
  Fragment,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Route,
  Routes,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import Editor from "./Editor";
import Home from "./Home";
import Logo from "./logo.png";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Settings from "./Settings";
const chainNames: Record<number, string> = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  31337: "Hardhat 3",
  1337: "Hardhat",
  137: "Polygon Mainnet",
  80001: "Polygon Mumbai",
};
const blockExplorers: Record<number, string> = {
  1: "https://etherscan.io/address/",
  3: "https://ropsten.etherscan.io/address/",
  4: "https://rinkeby.etherscan.io/address/",
  5: "https://goerli.etherscan.io/address/",
  42: "https://kovan.etherscan.io/address/",
  // 31337: "Hardhat 3",
  // 1337: "Hardhat",
  137: "https://polygonscan.com/address/",
  80001: "https://mumbai.polygonscan.com/address/",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const mainContext = createContext({
  title: "Dashboard",
  setTitle: (title: string) => {},
});
const { Provider: MainProvider } = mainContext;
export const useMain = () => useContext(mainContext);

const Main: FC = () => {
  const chainId = useChainId();
  const address = useAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigation = useMemo(() => {
    return [
      { name: "Home", to: "/", current: pathname === "/" },
      {
        name: "Document",
        to: "/editor",
        current: pathname.startsWith("/editor"),
      },
      { name: "Settings", to: "/settings", current: pathname === "/settings" },
    ];
  }, [pathname]);

  const [title, setTitle] = useState("Dashboard");
  const value = useMemo(() => ({ title, setTitle }), [title]);
  return (
    <Fragment>
      <div className="min-h-screen bg-purple-200">
        <Disclosure as="nav" className="bg-purple-800 border-b border-gray-200">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src={Logo}
                        alt="PolyDocs"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src={Logo}
                        alt="PolyDocs"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "border-pink-800 text-gray-200"
                              : "border-transparent text-gray-200 hover:border-gray-300 hover:text-gray-400",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                      type="button"
                      className="bg-white p-1 rounded-full text-gray-200 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div> */}
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-pink-800 inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      onClick={() => navigate(item.to)}
                      className={classNames(
                        item.current
                          ? " border-pink-500 text-pink-700"
                          : "border-transparent text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-400",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                {/* <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        onClick={() => navigate(item.to)}
                        className="block px-4 py-2 text-base font-medium text-gray-200 hover:text-gray-400 hover:bg-gray-100"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div> */}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-2">
          <header>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <h1 className="text-2xl font-bold leading-tight text-gray-900">
                {title}
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="px-4 py-8 sm:px-0">
                <MainProvider value={value}>
                  <SubMain />
                </MainProvider>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>

      <div className="p-2 flex flex-row justify-end fixed bottom-0 w-full align-right bg-purple-800 border-t-2 border-purple-500">
        <div className="text-white text-xs">
          Operating on{" "}
          {blockExplorers[parseInt(chainId, 16)] ? (
            // <a
            //   className="text-purple-300 hover:text-purple-500 transition"
            //   href={
            //     blockExplorers[parseInt(chainId, 16)] +
            //     addresses[parseInt(chainId, 16)]
            //   }
            // >
            // {
            chainNames[parseInt(chainId, 16)] ||
            "chain " + parseInt(chainId, 16).toString(10)
          ) : (
            // }
            // </a>
            <span className="">
              {chainNames[parseInt(chainId, 16)] ||
                "chain " + parseInt(chainId, 16).toString(10)}
            </span>
          )}{" "}
          with account {address.substring(0, 6)}...
          {address.substring(address.length - 4)}
        </div>
      </div>
    </Fragment>
  );
};

const SubMain: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Main;
