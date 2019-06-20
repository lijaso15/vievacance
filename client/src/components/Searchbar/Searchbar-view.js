import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SearchbarView = ({ handleChange }) => {
    return <section class="hero is-medium">
        <div class="hero-body">
            <div class="container">
                <div className="field">
                    <div className="control has-icons-right">
                        <input onChange={(e) => {
                            const value = e.target.value
                            handleChange(value)
                        }} class="input is-rounded" type="text" placeholder="Filter by city or country" />
                        <span className="icon is-small is-right">
                            <FontAwesomeIcon icon='search' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>


}

export default SearchbarView