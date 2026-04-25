import { Suspense } from "react";
import PaymentPage from "./Payment";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>
  );
}