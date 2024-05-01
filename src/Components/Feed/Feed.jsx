import React, { useEffect, useState } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
const Feed = ({category}) => {
    const[data,setData]=useState([]);

    const fetchData = async()=>{
        const vid_List=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY} `;
        console.log(vid_List);
        await fetch(vid_List).then(response=>response.json()).then(
            data=>setData(data.items)
        )}
        //https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&publishedAfter=2014-10-29T00%3A00%3A00Z&publishedBefore=2014-10-31T00%3A00%3A00Z&key=${API_KEY} 
        useEffect(()=>{
            fetchData();
        },[category])
        console.log(data);

        // const fetchvideo =async(id)=>{
        //     const vid_lab=`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyAlpVuC4kOQSEbx-i0qrgBO8C8KaRXDIs0`
        //     console.log(vid_lab);
        // }

        
    
  return (
    <div className='feed'>
        {data?.map((item,index)=>{
            // console.log(fetchvideo(item.id).categoryId)
            return (
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                    
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)} View &bull; {moment(item.snippet.publishedAt).fromNow()} ago</p>
            </Link>
            )
            
        })}
            
           
    </div>

  )
}

export default Feed