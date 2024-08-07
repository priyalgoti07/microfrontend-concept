import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import SafeComponent from "./SafeComponent";

import { capitalize } from "home/utils";
import { useSharedContext, SharedProvider } from 'home/SharedContext';
const Header = React.lazy(() => import("home/Header"))
const Footer = React.lazy(() => import("home/Footer"))

function SomeComponent() {
  const { count, incrementCount } = useSharedContext();
  console.log("count",incrementCount,count);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment count</button>
    </div>
  );
}

const App = () => (
  <div className="container">
    <Suspense fallback={<div>Loading...</div>}>
      <SafeComponent>
        <Header />
      </SafeComponent>
      <h5>{capitalize("products")}</h5>
      <SharedProvider>
        <SomeComponent />
      </SharedProvider>
      <p>Welcome to the Products page</p>
      <Footer />
    </Suspense>

  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)