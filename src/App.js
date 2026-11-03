import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "animate.css";

import Nav from "./components/system/Nav";
import DeviceSizeErr from "./components/Err/DeviceSizeErr";
import Toast from "./components/system/Toast";
import Loading from "./components/system/Loading";
import ApiCheck from "./components/Err/ApiCheck";
import NUi from "./components/ui/components/NUi/NUi";

// pages
import Home from "./pages/Home";
import Prescription from "./pages/Prescription";
import Insert from "./pages/Insert";
import Memo from "./pages/Memo";
// insert data pages
import Users from "./components/insertPageData/Users";
import Categ from "./components/insertPageData/Categ";
import Medicine from "./components/insertPageData/Medicine";
import Mnotes from "./components/insertPageData/Mnotes";
import Records from "./components/insertPageData/record/Record";
import Typem from "./components/insertPageData/Typem";

import { sessionData } from "./scripts/sessionData";
import siteData from "./data/setting/siteDetels.json";
import WhatsApp from "./components/sending/WhatsApp";

const MIN_WIDTH = 960;

function App() {
  useEffect(() => { document.title = siteData.siteName_en; }, []);

  // Intro splash: session e ekbar. Click korle skip hoy, nahole 15s por nije bondho.
  const [splash, setSplash] = useState(() => sessionData({ get: "uipopup" }) !== false);
  const endSplash = () => { sessionData({ setDB: "uipopup", set: false }); setSplash(false); };
  useEffect(() => {
    if (!splash) return;
    const t = setTimeout(endSplash, 15000);
    return () => clearTimeout(t);
  }, [splash]);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const f = () => setWidth(window.innerWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  if (splash) return <div onClick={endSplash} title="Click to skip"><NUi /></div>;
  if (width < MIN_WIDTH) return <DeviceSizeErr widthx={width} />;

  return (
    <div className="shell">
      <Nav />
      <main className="shellMain">
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/wamessege" element={<WhatsApp />} />
          <Route path="/insert/users" element={<Users />} />
          <Route path="/insert/category" element={<Categ />} />
          <Route path="/insert/medicine" element={<Medicine />} />
          <Route path="/insert/mNotes" element={<Mnotes />} />
          <Route path="/insert/records" element={<Records />} />
          <Route path="/insert/typem" element={<Typem />} />
        </Routes>
      </main>
      <Toast />
      <Loading />
      <ApiCheck />
    </div>
  );
}

export default App;
