import React, { useState } from 'react';
import axios from 'axios';

function NewPostComponent({ onPostSubmit, user }) {
    const [post, setPost] = useState('');
    const [file, setFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && post.trim() !== '') {
            handlePost();
        }
    };
    
    // In the handlePost function:
  const handlePost = async () => {
      // Don't allow empty posts
      if (post.trim() === '' && !file) return;
      
      try {
          const PostData = new FormData();
          PostData.append('username', `${user.firstName} ${user.lastName}`);
          PostData.append('firstName', user.firstName);
          PostData.append('lastName', user.lastName);
          PostData.append('postvalue', post);
          PostData.append('userId', user._id);
          
          if (file) {
              PostData.append('media', file);
          }
          
          await axios.post('http://localhost:5000/create-post', PostData, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          // Reset form
          setPost('');
          setFile(null);
          setPreviewURL(null);
          
          if (onPostSubmit) {
              onPostSubmit();
          }
      } catch (e) {
          console.error('Error posting ', e);
      }
  };
    
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreviewURL(URL.createObjectURL(selected));
        }
    };
    
    return (
        <div className='space-y-4'>
            <div className="bg-white rounded-lg p-4 shadow">
                <input 
                    onChange={(e) => setPost(e.target.value)} 
                    placeholder='Whats on your mind..' 
                    className='w-full outline-none p-4'  
                    onKeyDown={handleKeyDown} 
                    value={post}
                />
                {previewURL && (
                    <div className='mb-2'>
                        {file?.type?.startsWith('video') ? (
                            <video className='max-w-full rounded' controls>
                                <source src={previewURL} type={file.type} />
                            </video>
                        ) : (
                            <img src={previewURL} alt='preview' className='max-w-full rounded' />
                        )}
                    </div>
                )}
                <hr/>
                <div className='flex justify-between items-center px-4 py-2'>
                    <label className='flex-1 text-center cursor-pointer'>
                        Live video
                        <input className='hidden' />
                    </label>
                    <label className='flex-1 text-center cursor-pointer'>
                        Image/Video
                        <input 
                            type='file' 
                            accept='image/*,video/*' 
                            className='hidden'
                            onChange={handleFileChange}
                        />
                    </label>
                    <button 
                        className='flex-1 text-center disabled:opacity-50' 
                        onClick={handlePost}
                        disabled={!post.trim() && !file}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewPostComponent;