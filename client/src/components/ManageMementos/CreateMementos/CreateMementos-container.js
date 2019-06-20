import React from 'react'
import CreateMementosView from './CreateMementos-view'
import axios from 'axios'

const CreateMementos = ({ owner, selectedPhotos, cities, setError, message }) => {
    return <CreateMementosView owner={owner} message={message}
        createMemento={() => {
            if (!document.querySelector('select').selectedIndex) {
                setError('ERR_EDIT', 'Select a city')
                return
            } else {
                const city = cities[document.querySelector('select').selectedIndex - 1].city
                const country = cities[document.querySelector('select').selectedIndex - 1].country
                const description = document.querySelector('textarea').value
                const photos = selectedPhotos.map(p => p.id)

                if (!photos.length) {
                    setError('ERR_EDIT', 'Select one or more photos')
                    return
                } else if (!description) {
                    setError('ERR_EDIT', 'Write about your trip')
                    return
                } else {
                    axios.post(`/mementos/${owner}`, { description, photos, city, country }).then(res => {
                        if (res.status === 200) {
                            setError('ERR_EDIT', 'Success!')
                            setTimeout(() => window.location.reload(), 1000)
                        }
                    }).catch(err => alert(err))
                }
            }

        }}
    />
}


export default CreateMementos