const Card = ({
  count,
  CounterHandler,
}: {
  count: number;
  CounterHandler: () => void;
}) => {
  console.log("Card");
  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Counter Card</h2>

      <p className="text-gray-600 mb-6">
        Click the button to increase the counter 🚀
      </p>

      <button
        onClick={CounterHandler}
        className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
      >
        Count is {count}
      </button>
    </div>
  );
};

export default Card;
