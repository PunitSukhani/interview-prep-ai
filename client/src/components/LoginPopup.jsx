export default function LoginPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <p>This is a placeholder login popup.</p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
