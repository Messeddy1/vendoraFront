import { useCallback, useMemo, useState } from "react";
import Card from "./CradCounter";
import CardViewText from "./CardVieaText";

function App() {
  const [count, setCount] = useState(0);
  const name = useMemo(() => {
    return {
      firstName: "John",
      lastName: "Doe",
    };
  }, []);
  const CounterHandler = () => {
    setCount((prev) => prev + 1);
  };
  const HandleAge = useCallback(() => {
    console.log("HandleAge");
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-bold text-gray-800">🚀 Vite + React</h1>

      <Card count={count} CounterHandler={CounterHandler} />
      <CardViewText text={name} HandleAge={HandleAge} />
    </div>
  );
}

export default App;
