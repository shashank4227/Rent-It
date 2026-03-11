import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import galleryImages from './galleryImages'
import "./MasonryImagesGallery.css"

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakpoints={{350: 1, 768: 3, 992: 4}}>
      <Masonry gutter="1rem">
        {
          galleryImages.map((item, index) => (
            <img 
            className='masonry-img'
              src={item} 
              key={index} 
              alt="" 
              style={{ width: '90%', display: 'flex', borderRadius: '10px', margin: 'auto',marginBottom: '50px' }} 
            />
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default MasonryImagesGallery
