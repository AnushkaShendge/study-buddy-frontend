function DisplayNote({ note, handleClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-blue-400 to-cyan-300 text-black p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Note</h2>
          <button
            onClick={handleClose}
            className="text-gray-700 hover:text-gray-900 transition duration-200"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-center font-semibold text-orange-400">{note.title}</h2>
            {note.images && note.images.length > 0 && (
              <div className="flex flex-wrap justify-center mt-2 space-x-2">
                {note.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`img-${index}`}
                    className="w-full p-2 mb-2 rounded-lg"
                  />
                ))}
              </div>
            )}
            <p className="mt-2 text-sm leading-4 text-gray-700">{note.content}</p>
          </div>
          {note.shared_with && (
            <div className="bg-white bg-opacity-20 p-2 rounded-lg mb-4">
              <p className="text-xs font-semibold text-white mb-1">Note Shared with:</p>
              <ul className="text-xs font-light text-white list-disc list-inside">
                {note.shared_with.map((person, index) => (
                  <li key={index}>{person}</li>
                ))}
              </ul>
            </div>
          )}
          {note.documents && note.documents.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700">Documents:</p>
              <ul className="mt-2 space-y-2">
                {note.documents.map((doc, index) => {
                  const docUrl = `http://localhost:5173${doc}`;
                  return (
                    <li key={index} className="text-sm text-blue-600 underline">
                      <p className="text-xs">Document {index + 1}</p>
                      <iframe 
                        src={docUrl} 
                        width="100%" 
                        height="600px" 
                        className="border mt-2"
                        title={`Document ${index + 1}`}
                      ></iframe>
                      <p className="text-xs">URL: {docUrl}</p> {/* Added for debugging */}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayNote;
