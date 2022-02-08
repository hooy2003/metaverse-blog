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
        />
      </div>

    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
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

    // let [pttItems, redditItems, twitterItems, igItems] = await Promise.all([ptt_(), reddit_(), twitter_(), IG_()]);
    
    let pttItems, redditItems, twitterItems, igItems

    async function totalItems_ () {
      try {
        // pttItems = await ptt_()
        // redditItems = await reddit_()
        // twitterItems = await twitter_()
        igItems = await IG_()

        // return pttItems.concat(redditItems, twitterItems, igItems)
        return [pttItems, redditItems, twitterItems, igItems]
      }
      catch(err) {
        console.log('catch', err)
      }
    }

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

    async function twitter_ () {
      try {
        const twitterList = await Request.getRssFromTwitter();
        const titter_name = twitterList.data.rss.channel.image.title
        const twitterItems = [...twitterList.data.rss.channel.item].map((i) => ({
          type: 'twitter',
          link: i.link,
          title: titter_name,
          originPub: i.pubDate,
          pubTime: dayjs(i.pubDate).format("YYYY/MM/DD HH:mm"),
          content: i.description
        }));

        console.log('twitterItems', twitterItems)
        return twitterItems

      }
      catch(err) {
        console.log('推特rss 掛了')
      }
    }

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
      console.log('IGList', IGList, IGList.data.reel)
      if(IGList.data?.reel) {
        IGList.data.reel.items.map((i,index) =>
          igItems.push({
            type: 'ig',
            link: '',
            title: i.user.username,
            originPub: i.user.username+index,
            pubTime: dayjs.unix(i.taken_at).format("YYYY/MM/DD HH:mm"),
            // isVideo or mediatype media_type
            // candidates[3] == 480x853
            thumbnail: i.media_type==1?i.image_versions2.candidates[3].url:'',
            videoSrc: i.media_type==2?'':'',
            content: '',
            description: '',
          })
        );
      }

      console.log('igItems', igItems)

      return igItems
    }


    // wait await all done
    async function mergeAllItem () {
      try {
        const total = await totalItems_()
        let defaultAll = []
        total.forEach((item=>{
          if(item) {
            defaultAll = defaultAll.concat(item)
          }
        }))
        // 按照時間去排列
        allItems.value = algorithm.insertionDate(defaultAll)
        console.log('allItems', allItems)
      } catch (error) {
      }
    }
    await mergeAllItem()

    return {allItems}
  }
}
</script>