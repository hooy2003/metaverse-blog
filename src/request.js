import axios from 'axios'
import X2JS from './xml2json'

window.REQ = axios.create({
  baseURL: 'https://api.allorigins.win/get?url=https://',
  'Content-Type': 'application/json',
  timeout: 10000
});

const getRssFromPtt = async()=>{
  try {
    const res = await REQ.request({
      url: `www.ptt.cc/atom/DigiCurrency.xml`,
      method: 'GET',
    })

    if(res.status==200)
    {
      const { contents } = res.data;
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");

      let x2js = new X2JS();
      let jsonObj = x2js.xml2json(feed);
      console.log('ptt', jsonObj)

      return new Promise(resolve=>resolve({status:200,data:jsonObj}));
    } else{
      return new Promise(resolve=>resolve({status:res.status,data:res}));
    }
  }catch(e){
    return new Promise(resolve=>resolve({status:500}));
  }
}

const getRssFromTwitter = async()=>{
  try {
    const res = await REQ.request({
      // rss.app/feeds/vbAS8PT5icBz8KSm.xml
      url: `nitter.net/elonmusk/rss`,
      method: 'GET',
    })

    if(res.status==200)
    {
      const { contents } = res.data;
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");

      let x2js = new X2JS();
      let jsonObj = x2js.xml2json(feed);
      console.log('twitter', jsonObj)

      return new Promise(resolve=>resolve({status:200,data:jsonObj}));
    } else{
      return new Promise(resolve=>resolve({status:res.status,data:res}));
    }
  }catch(e){
    return new Promise(resolve=>resolve({status:500}));
  }
}

const getRssFromReddit = async()=>{
  try {
    const res = await REQ.request({
      url: `www.reddit.com/r/NFT/top.rss?sort=day`,
      method: 'GET',
    })

    if(res.status==200)
    {
      const { contents } = res.data;
      // console.log('reddis', contents)
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");

      let x2js = new X2JS();
      let jsonObj = x2js.xml2json(feed);
      console.log('reddis', jsonObj)

      return new Promise(resolve=>resolve({status:200,data:jsonObj}));
    } else{
      return new Promise(resolve=>resolve({status:res.status,data:res}));
    }
  }catch(e){
    return new Promise(resolve=>resolve({status:500}));
  }
}


const getSearchFromYoutube = async()=>{
  try {
    // https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=nft&key=[YOUR_API_KEY]
    // Accept: application/json
    const res = await REQ.request({
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=nft&key=AIzaSyD-R_SBhKzJW8HWoTxdk2teXdLDNJN5tqg`,
      method: 'GET',
    })

    if(res.status==200)
    {
      console.log('yt', res.data)
      return new Promise(resolve=>resolve({status:200,data:res.data}));
    } else{
      return new Promise(resolve=>resolve({status:res.status,data:res}));
    }
  }catch(e){
    return new Promise(resolve=>resolve({status:500}));
  }
}
// rsshub.app/picuki/profile/0xninja
const getProfileFromeIG = async()=>{
  try {
    const res = await REQ.request({
      // url: `metaverse-blog-api.herokuapp.com/igstories/juliawu94`,
      url: `https://metaverse-blog-api.herokuapp.com/igstories/`,
      method: 'GET',
    })

    if(res.status==200)
    { 
      console.log('ig', JSON.parse(res.data.data[0].data) )
      const data = JSON.parse(res.data.data[0].data);

      return new Promise(resolve=>resolve(
        {
          status:200,
          data:data
        }));
    } else{
      return new Promise(resolve=>resolve({status:res.status,data:res}));
    }
  }catch(e){
    return new Promise(resolve=>resolve({status:500}));
  }
}

export default {
  getRssFromPtt,
  getRssFromTwitter,
  getRssFromReddit,
  getSearchFromYoutube,
  getProfileFromeIG
}