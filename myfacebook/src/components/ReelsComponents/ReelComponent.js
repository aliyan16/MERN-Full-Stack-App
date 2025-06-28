import React from 'react'

function ReelComponent({videos}) {
  return (
    <>
    <div className='bg-white ' >
        {videos.length===0?(
          <div className="text-center text-gray-500">
            No reels to Display
          </div>
        ):(
          videos.map((video,index)=>(
            <div key={index} className='bg-gray-300 w-full h-full rounded-lg flex items-center justify-center cursor-pointer p-4 mr-4 mb-5' >
              <video controls className='max-w-full rounded' >
                <source src={`http://localhost:5000/media/${video.media.fileId}`} type={video.media.contentType} />
                Your browser does not support the video tag.
              </video>

            </div>
          ))
        )}
    </div>
    </>
  )
}

export default ReelComponent