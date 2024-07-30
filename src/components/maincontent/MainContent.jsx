import React from 'react'
import './maincontent.css'
import Layout from '../layout/Layout'

const MainContent = () => {
  return (
    <div>
      <Layout/>
      <section className="container">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow p-4">Creative
            {/* card body */}
            <div className="card-body">Creative body</div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card shadow p-4">Affordable
            {/* card body */}
            <div className="card-body">Affordable body</div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="card shadow p-4">Efficient
            {/* card body */}
            <div className="card-body">Efficient body</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainContent
