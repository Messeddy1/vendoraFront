export default function Index() {
  return (
    <div className="max-w-2xl px-6 py-10 ">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to my page</h1>
      <p className="text-gray-500 text-lg leading-relaxed mb-10">
        This is a paragraph of body text. You can write anything here —
        descriptions, explanations, stories, or any content you want to share.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">About this section</h2>
      <p className="text-gray-500 leading-relaxed mb-10">
        Headings help organize your content into sections. An h2 is a bit
        smaller than an h1, and works well for subsections.
      </p>

      <h3 className="text-xl font-semibold text-gray-700 mb-2">A smaller heading</h3>
      <p className="text-gray-500 leading-relaxed mb-10">
        An h3 is used for even deeper nesting. Text underneath each heading
        gives context and detail to the reader.
      </p>

      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-400 mb-10">
        This is a blockquote — useful for highlighting a quote or key insight.
      </blockquote>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Summary</h2>
      <p className="text-gray-500 leading-relaxed">
        Headings (h1, h2, h3) structure your page, and paragraphs fill it with
        content. Keep things simple and readable.
      </p>
    </div>
  );
}