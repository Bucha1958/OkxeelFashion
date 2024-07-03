// BlogPosts.jsx
import React from 'react';
import BlogPost from './Blogpost';

const BlogPosts = () => {

    const posts = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D',
            title: 'Fall Fashion Forecast: Top Trends to Watch Out For',
            summary: 'We do not just gift wrap, we personalize the experience. Choose from a variety of wrapping options and add a special touch to every gift.',
            link: '#',
        },
        {
            imageUrl: 'https://media.istockphoto.com/id/1385668234/photo/igbo-traditionally-dressed-business-man-standing-dancing-with-hand-forward.jpg?s=1024x1024&w=is&k=20&c=wXwjBMtmNNr_BB2Pn4otx0TMtlHgW5uamFRsnsCSyFM=',
            title: 'The Underrated Beauty of Ishiagu Fabric',
            summary: 'This summary highlights the unique qualities of Ishiagu fabric that might surprise readers.',
            link: '#',
        },
        {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1682089428454-8f21f3ed62f3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Find Your Perfect Fit: How Fabric Affects Your Suits Look and Feel',
            summary: 'It grab attention and highlight different aspects of suit fabric:',
            link: '#',
        }
    ];

    const displayedPosts = posts.slice(0, 3);

    return (
        <>
            <div className='flex flex-col items-center justify-center mt-24'>
                <h1 className='montserrat-one text-black font-light text-4xl mb-10'>OUR BLOG POSTS</h1>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedPosts.map((post, index) => (
                    <BlogPost
                    key={index}
                    imageUrl={post.imageUrl}
                    title={post.title}
                    summary={post.summary}
                    link={post.link}
                    />
                ))}
                </div>
                <div className="text-center mt-8">
                <a href="/blog" className="text-blue-500 hover:text-blue-700 text-lg">
                    See All Blog Posts
                </a>
                </div>
            </div>
        </>
        
    );
};

export default BlogPosts;
