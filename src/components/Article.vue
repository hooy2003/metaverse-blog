<template>
  <div class="dark:bg-black dark:text-white">
    <div 
      class="m-auto max-w-[1024px]"
    >
      <div class="pb-4 px-2">
        <ArticleModule 
          v-for="(item, index) in allItems"
          :key="item.key"
          :type="item.type"
          :link="item.link"
          :title="item.title"
          :originPub="item.originPub"
          :pubTime="item.pubTime"
          :thumbnail="item.thumbnail"
          :videoSrc="item.videoSrc"
          :content="item.content"
          :description="item.description"
          :crossDown="item.crossDown"
        />
        <!-- <PTTArticleModule 
          v-for="(item, index) in pttItems"
          :key="item.key"
          :title="item.title"
          :link="item.link"
          :published="item.published"
          :content="item.content"
        />
        <TwitterArticleModule
          v-for="(item, index) in twitterItems"
          :key="item.key"
          :title="item.title"
          :link="item.link"
          :pubDate="item.pubDate"
          :description="item.description"
          :content="item.content"
        /> -->
        <!-- <RedditArticleModule
          v-for="(item, index) in redditItems"
          :key="item.key"
          :title="item.title"
          :link="item.link"
          :pubDate="item.pubDate"
          :description="item.description"
          :content="item.content"
        />
        <YoutubeModule
          v-for="(item, index) in youtubeItems"
          :key="item.key"
          :title="item.title"
          :link="item.link"
          :publishTime="item.publishTime"
          :thumbnails="item.thumbnails"
        /> -->
      </div>

    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import Request from '../request'
import ArticleModule from './utilities/ArticleModule'
import PTTArticleModule from './utilities/PTTArticleModule'
import TwitterArticleModule from './utilities/TwitterArticleModule'
import RedditArticleModule from './utilities/RedditArticleModule'
import YoutubeModule from './utilities/YoutubeModule'
import dayjs from 'dayjs'
import algorithm from '../algorithm'

export default {
  name: 'Form',
  components: {
    ArticleModule,
    PTTArticleModule,
    TwitterArticleModule,
    RedditArticleModule,
    YoutubeModule
  },
  async setup() {
    let allItems = ref([])

    let [pttItems, redditItems, igItems] = await Promise.all([ptt_(), reddit_(), IG_()]);

    async function ptt_ () {
      const pttArticleList = await Request.getRssFromPtt();

      let pttItems = []

      pttArticleList.data.feed.entry.map(
        (i) => {
          if(dayjs().diff(dayjs(i.published), 'second')<86400) {
            pttItems.push({
              type: 'ptt',
              link: i.link._href,
              title: i.title,
              originPub: i.published,
              pubTime: dayjs(i.published).format("YYYY/MM/DD HH:mm"),
              content: i.content.__text,
              description: ''
            })
          }
        }
      );
      // 注意有無UTC
      // console.log('pttItems', pttItems)

      return pttItems
    }
    // async function twitter_ () {
    //   const twitterList = await Request.getRssFromTwitter();

    //   const twitterItems = [...twitterList.data.rss.channel.item].map((i) => ({
    //     type: 'twitter',
    //     link: i.link,
    //     title: i.title,
    //     originPub: i.pubDate,
    //     pubTime: dayjs(i.pubDate).format("YYYY/MM/DD HH:mm"),
    //     thumbnail: i.enclosure?i.enclosure._url:'',
    //     content: '',
    //     description: i.description
    //   }));

    //   console.log('twitterItems', twitterItems)
    //   return twitterItems
    // }
    async function reddit_ () {
      const redditList = await Request.getRssFromReddit();

      const redditItems = [...redditList.data.feed.entry].map((i) => ({
        type: 'reddit',
        link: i.link._href,
        title: i.title,
        originPub: i.published,
        pubTime: dayjs(i.published).format("YYYY/MM/DD HH:mm"),
        thumbnail: i.thumbnail?i.thumbnail._url:'',
        content: '',
        description: ''
      }));

      // console.log('redditItems', redditItems)
      return redditItems
    }

    async function IG_ () {
      const IGList = await Request.getProfileFromeIG();

      let igItems = []
      console.log('IGList', IGList, IGList.data?.data, IGList.data.data)
      if(IGList.data?.data) {
        // IGList.data?.data // icon 分界線
        IGList.data.data.map((icon,index) =>
          icon.data.items.map((i,index) => {
            // let video_src = ''
            // if(i.is_video) {
            //   // video_resources = https://www.picuki.com/hosted-by-instagram/url=xxxxxx
            //   video_src = 'https://api.allorigins.win/get?url=https://'.concat('', i.video_resources[0].src)
            //   console.log('video_src', video_src)
            // }
            igItems.push({
              type: 'ig',
              link: '',
              title: i.owner.username,
              originPub: i.owner.username+index,
              pubTime: dayjs.unix(i.taken_at_timestamp).format("YYYY/MM/DD HH:mm"),
              thumbnail: i.display_resources?i.display_resources[0].src:'',
              // videoSrc: video_src,
              videoSrc: i.is_video?i.video_resources[0].src:'',
              content: '',
              description: '',
              crossDown: true
            })
          })
        );
      }

      console.log('igItems', igItems)

      return igItems
    }



    // wait await all done
    const total = await pttItems.concat(redditItems, igItems);
    // 按照時間去排列
    allItems = algorithm.insertionDate(total)
    // console.log('allItems', allItems)

    // let youtubeItems = ref([])
    // const youtubeList = await Request.getSearchFromYoutube();

    // youtubeItems = [...youtubeList.data.items].map((i) => ({
    //   link: `https://www.youtube.com/watch?v=`+i.id.videoId,
    //   title: i.snippet.title,
    //   publishTime: i.snippet.publishTime,
    //   thumbnails: i.snippet.thumbnails.default.url,
    // }));

    return {allItems}
  }
}
</script>