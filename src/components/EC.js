import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import * as ReactBootStrap from 'react-bootstrap'




const EC = (props) => {
  const [loading, setLoading] = useState(false)


  const term = props.match.params.term
  const dl = <FontAwesomeIcon icon={faDownload} size="1x" />
  const delays = [200, 400, 600, 800]

  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState('1')


  useEffect(() => {
    try {
      axios.get(`https://pixabay.com/api/?key=17709445-44886c317d74b5bec61381738&q=&image_type=photo&editors_choice=true&page=${page}`)
        .then((resp) => {
          const photos = resp.data

          setPhotos(photos.hits)
        })
      setLoading(true)
    } catch (e) {
      console.log(e)
    }

  }, [term, page])

  function handlePage(event) {
    setPage(event.target.value)
    scrollToTop()
  }

  function scrollToTop() {
    window.scrollTo(0, 0)
  }



  return <div className="search">

    <div className="search-bg"></div>

    {loading ? (<div className="photos-wrapper">


      {photos.map((photo, index) => {

        return <div className="card card-custom" key={index} >
          <Fade delay={delays[Math.round(Math.random() * 3)]}>
            <img className="card-img-top" src={photo.webformatURL} alt="Card image cap" />
          </Fade>
          <div className="card-body">
            <h5 className="card-title">by {photo.user}</h5>
            <a href={photo.largeImageURL} target="_blank" rel="noreferrer" className="btn-dl">{dl}</a>
          </div>
        </div>

      })}


    </div>) : <div className="loader">
        <ReactBootStrap.Spinner style={{ color: '#d9ae7b', width: '5rem', height: '5rem' }} animation="grow" />
      </div>}


    <Fade>
      {loading && <div className="pages">
        <button className={page === '1' ? 'btn-page-active' : 'btn-page'} value="1" onClick={handlePage}>1</button>
        <button className={page === '2' ? 'btn-page-active' : 'btn-page'} value="2" onClick={handlePage}>2</button>
        <button className={page === '3' ? 'btn-page-active' : 'btn-page'} value="3" onClick={handlePage}>3</button>
        <button className={page === '4' ? 'btn-page-active' : 'btn-page'} value="4" onClick={handlePage}>4</button>
        <button className={page === '5' ? 'btn-page-active' : 'btn-page'} value="5" onClick={handlePage}>5</button>
      </div>}
    </Fade>



  </div >

}

export default EC