import React, { Suspense } from "react";
import AppRoutes from "../Router/Routes";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
  );
}
