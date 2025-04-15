import React from 'react'
import '../css/interma.css'
import Cards from './Cards'

export default function Interma(promps) {
  return (<div className='interma'>
    <Cards props={promps.name}  />
  </div>
  )
}
