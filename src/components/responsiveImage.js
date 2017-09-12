import React from 'react'

import {image} from '../styles/responsiveImage.module.scss'

const ResponsiveImage = ({aspectRatio, ...rest}) => (
  <div style={{position: 'relative'}}>
    <div style={{paddingTop: `${100.0 / aspectRatio}%`}}>
      <img className={image} {...rest} />
    </div>
   </div>
)

export default ResponsiveImage
