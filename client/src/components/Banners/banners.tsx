import React from 'react'
import Banner from './Banner'
import { connect } from 'react-redux'

const Banners = ({ data }) => {
    return <div className="container" style={{
        height: '50vh',
        overflow: 'scroll'
    }}>
        <div className="box" style={{ padding: 0 }}>
            {data.map((v, i) => {
                return <Banner id={i} />
            })}
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        data: state.data.cities
    }
}

export default connect(mapStateToProps)(Banners)