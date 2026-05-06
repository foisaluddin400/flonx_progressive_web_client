import { Suspense } from "react";
import ForgetPass from "./ForgetPass";



export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgetPass/>
    </Suspense>
  );
}