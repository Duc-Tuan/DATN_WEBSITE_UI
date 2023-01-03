import { Routes, Route } from "react-router-dom";
import { publicRouters, privateRouters, privateRoutersReset } from "./routers";
import { DefaultLayout } from "./Layouts";
import { Fragment, useEffect, useState } from "react";
import { useStateValue } from "./contexts/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [data, setData] = useState(publicRouters);

  useEffect(() => {
    const codeM =
      JSON.parse(localStorage.getItem("code")) ||
      Math.random().toString(36).substring(2, 20);
    const codeCM = JSON.parse(localStorage.getItem("codeXM")) || "";
    const MHcode =
      codeM?.slice(0, 1) +
        codeM?.slice(6, 8) +
        codeM?.slice(11, 13) +
        +codeM?.slice(17) || "";
    if (user) {
      setData(publicRouters.concat(privateRouters));
    }
    if (codeCM.toString() === MHcode) {
      setData(publicRouters.concat(privateRoutersReset));
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>
        {data.map((router, index) => {
          const Page = router.component;

          let Layout = DefaultLayout;

          if (router.layout) {
            Layout = router.layout;
          } else if (router.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={router.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
