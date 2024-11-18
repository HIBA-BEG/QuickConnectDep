import React from 'react';

export default function PopUp({ isOpen, onClose, onSubmit }: any) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <span className='w-full flex justify-center'>

                    <svg xmlns="http://www.w3.org/2000/svg" height="150" width="150" viewBox="0 0 512 512"><path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                </span>
                <h2 className="text-3xl mt-10 font-light mb-4">Are you sure?</h2>
                <p className="mb-6 text-gray-700">Do you really want to delete these? this process cannot be undone.</p>
                <div className="flex justify-around">
                    <button
                        className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                        onClick={onSubmit}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
