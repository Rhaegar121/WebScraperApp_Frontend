// import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchScraperData, fetchProducts } from "../redux/productsSlice"

const Form = () => {
  const dispatch = useDispatch()
  const url = 'https://www.flipkart.com/lenovo-23-8-inch-full-hd-va-panel-3-side-near-edgeless-tuv-eye-care-monitor-d24-20/p/itm8f8c6bfc86fb5?pid=MONFV5HRNF4QFVG4&lid=LSTMONFV5HRNF4QFVG4ATFEMN&marketplace=FLIPKART&store=6bo%2Fg0i%2F9no&srno=b_1_1&otracker=clp_metro_expandable_2_3.metroExpandable.METRO_EXPANDABLE_LG_monitors-store_04FG6HZUUFKV_wp3&fm=neo%2Fmerchandising&iid=en_cqpDeGPALSku136Z1OmI0zH1wAQfWAajyx0QrRsORSsfhHAsfBHd3NjxwLzC9qP3wgT8V7eVxEeZUI7AVs5yGg%3D%3D&ppt=clp&ppn=monitors-store&ssid=lx688hi15c0000001691764371155';

  const scrape = () => {
    dispatch(fetchScraperData({url: url}))
  }

  const fetch = () => {
    dispatch(fetchProducts('Lenovo'))
  }

  return (
    <div>
      <button type="button" onClick={scrape}>Scrape</button>
      <button type="button" onClick={fetch}>fetch</button>
    </div>
  )
}

export default Form;