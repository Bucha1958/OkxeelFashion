// BlogPost.jsx
import React from 'react';

const BlogPost = ({ imageUrl, title, summary, link }) => {
    return (
        <>
            <div className="max-w-xs w-full bg-white shadow-md overflow-hidden m-4">
                <img className="w-full h-56 object-cover" src={imageUrl} alt={title} />
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-700">{summary}</p>
                    <a href={link} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">Read More</a>
                </div>
            </div>
        </>
        
    );
};

export default BlogPost;
