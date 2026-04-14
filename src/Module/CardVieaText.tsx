import React, { useEffect } from "react";
import Text from "./Text";

type Props = {
  text?: {
    firstName: string;
    lastName: string;
  };
  HandleAge?: () => void;
};

const CardViewText = ({ text, HandleAge }: Props) => {
  console.log("CardViewText");

  const Callapi = () => {
    // نقصنا العدد باش ما يهنگش التطبيق 😄
    for (let i = 0; i < 10000000; i++) {
      /* empty */
    }
    console.log("Callapi");
  };

  // ✅ يتنفذ غير مرة وحدة
  useEffect(() => {
    Callapi();
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        the include text:
      </h2>

      <Text>{text?.firstName}</Text>
      <button
        onClick={HandleAge}
        className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
      >
        age
      </button>
    </div>
  );
};

export default React.memo(CardViewText);
