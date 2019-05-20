import React from 'react'
import Slideshow from '../../components/Slideshow'
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'

const data = [{ title: 'VieVacance', subtitle: 'Plan. Explore. Remember.', image: img1 },
{
    title: 'Plan your next vacation',
    subtitle: 'Collect the places you want to visit and when when you are ready, select the places you want to go on your next vacation.', image: img2
},
{ title: 'Explore the world through our users', subtitle: 'Become inspired by the mementos our users share about their latest trip', image: img3 },
{ title: 'Remember your trip for ages to come', subtitle: 'Share your own memories and recommend users. Click anywhere to get started!', image: img4 }]


const Landing = () => {
    return (
        <div>
            <Slideshow slides={data} />
        </div>
    )
}



export default Landing