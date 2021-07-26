import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  PanelHeader,
  ConfigProvider,
  withAdaptivity,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./main.css";

import Anime from "./panels/Anime";
import Calendar from "./panels/Calendar";

import { ConstantProvider } from "./context/ConstantContext";

function App({ viewWidth }) {
  const [router, setRouter] = useState({
    activePanel: "home",
    history: ["home"],
  });

  const [modalData, setModalData] = useState({});

  const goBack = () => {
    const history = [...router.history];
    history.pop();
    const activePanel = history[history.length - 1];
    if (activePanel === "main") {
      vkBridge.send("VKWebAppEnableSwipeBack");
    }
    setRouter({ history, activePanel });
  };

  const goForward = (activePanel) => {
    const history = [...router.history];
    history.push(activePanel);
    if (router.activePanel === "main") {
      vkBridge.send("VKWebAppDisableSwipeBack");
    }
    setRouter({ history, activePanel });
  };

  bridge.subscribe(({ detail: { type, data } }) => {
    if (type === "VKWebAppUpdateConfig") {
      const schemeAttribute = document.createAttribute("scheme");
      schemeAttribute.value = data.scheme ? data.scheme : "client_light";
      document.body.attributes.setNamedItem(schemeAttribute);
    }
  });

  // useEffect(() => {
  //   bridge.send("VKWebAppAllowNotifications");
  // }, []);

  const go = (e) => {
    if (e.to == "anime") {
      fetch("https://shikimori.one/api/animes/" + e.id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setModalData(data);
          goForward(e.to);
        });
    } else {
      setActivePanel(e.to);
    }
  };
  const isDesktop = viewWidth >= 800;

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <SplitLayout>
          <SplitCol>
            <AppRoot>
              <ConstantProvider>
                <View
                  onSwipeBack={goBack}
                  history={router.history}
                  activePanel={router.activePanel}
                >
                  {/* <Home id='home' fetchedUser={fetchedUser} go={go} /> */}
                  {/* <Persik id="persik" go={go} /> */}
                  <Calendar id="home" go={go} isDesktop={isDesktop} />
                  <Anime
                    id="anime"
                    goBack={goBack}
                    data={modalData}
                    isDesktop={isDesktop}
                  />
                </View>
              </ConstantProvider>
            </AppRoot>
          </SplitCol>
        </SplitLayout>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
App = withAdaptivity(App, { viewWidth: true });

export default App;
