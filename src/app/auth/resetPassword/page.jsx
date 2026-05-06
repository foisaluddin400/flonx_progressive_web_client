import { Suspense } from "react";


import ResetPass from "./ResetPass";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPass/>
    </Suspense>
  );
}