const fetch = require('node-fetch')
const { sign } = require('./X-Bogus')
const download = require('download')
const getDeepProperty = require("@orange-opensource/get-deep-property");
class Scraper {

    constructor() {
        this.headers = { // sign 需要的参数
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        };

        this.douyinApiHeaders = {
            'accept-encoding': 'gzip, deflate, br',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
            'referer': 'https://www.douyin.com/',
            'cookie': "ttwid=1%7C0YBAnAwiC5T3U5yJi8RVXEK3DOwF_2vpJ7kVJJZe8HU%7C1666668932%7C21048e6555b73e8801d3956afc6130b4a05ae73a2eefe4d3fef5ef1b61caf0e9; __live_version__=%221.1.1.2586%22; odin_tt=a77b90afad5db31e86fe004b39c5f35423292023ce7837cde82fd1f7fe54278890ce24dc89e09c8a2e55b1f4904950a7b0fca6b4fbff3b549ba6d55a335373ec; pwa2=%223%7C0%7C0%7C0%22; s_v_web_id=verify_lkagpdq1_IuHpxJyS_q6YH_4AvH_8aNH_zhvGPr95Jrc8; passport_csrf_token=301cf539fb735ab77de7e382b0dd93e5; passport_csrf_token_default=301cf539fb735ab77de7e382b0dd93e5; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCRXhuWUdqREVBa3ErdjRsT2l3anRIWi9HU2hRNXFseWdJMklLanIxM0orRHozYnA0M2pXc3M3N25CUzdnbE5tTXhHbWU3cldoSE9pdkJvVmNnT2JiWFU9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ==; passport_assist_user=CkHJzB17Xsy3FUHyNfX2Dyb8IFKKA_0pu1SKYG0OAT_av3ImQyCbEmGJV7b8MJep4l9MjeCRK1FPY9k9yAkVHbIbvhpICjzS68aPlRjIsUzHLIEM-5jMbp9awcdJnkACni5Nnc_PBm4ljAlEqChbF4nYPpn4xyh4kY2hBvRikmXs0sgQ4fq2DRiJr9ZUIgEDbm8-yw%3D%3D; n_mh=13KNPUKNEzoW3A4J-OLRxfal2zj1GbF-vJUFPs3WSIY; sso_uid_tt=2581aab41d03156c0b7fee9c7e865c6c; sso_uid_tt_ss=2581aab41d03156c0b7fee9c7e865c6c; toutiao_sso_user=b2556b53ed5cee89e947b154b17645f1; toutiao_sso_user_ss=b2556b53ed5cee89e947b154b17645f1; sid_ucp_sso_v1=1.0.0-KDhlZjRhMmJhZGU0OTVmOWM0YzBkMTY5ZGNkZmI4NTFjNTk2ODU5OTkKHwiPluCxqYzbAhC29OKmBhjvMSAMMLDIpZkGOAZA9AcaAmhsIiBiMjU1NmI1M2VkNWNlZTg5ZTk0N2IxNTRiMTc2NDVmMQ; ssid_ucp_sso_v1=1.0.0-KDhlZjRhMmJhZGU0OTVmOWM0YzBkMTY5ZGNkZmI4NTFjNTk2ODU5OTkKHwiPluCxqYzbAhC29OKmBhjvMSAMMLDIpZkGOAZA9AcaAmhsIiBiMjU1NmI1M2VkNWNlZTg5ZTk0N2IxNTRiMTc2NDVmMQ; sid_guard=c1d1ac1d22198149dfc6cac74938b14a%7C1691925046%7C5184000%7CThu%2C+12-Oct-2023+11%3A10%3A46+GMT; uid_tt=7e39a426dac7802b2448fa2266ca1b85; uid_tt_ss=7e39a426dac7802b2448fa2266ca1b85; sid_tt=c1d1ac1d22198149dfc6cac74938b14a; sessionid=c1d1ac1d22198149dfc6cac74938b14a; sessionid_ss=c1d1ac1d22198149dfc6cac74938b14a; sid_ucp_v1=1.0.0-KDc4Y2VkZjIyN2JlMDNhYmNhYTFlYTE5ODM1YzI2YjVlZDNmMGY0N2YKGwiPluCxqYzbAhC29OKmBhjvMSAMOAZA9AdIBBoCbHEiIGMxZDFhYzFkMjIxOTgxNDlkZmM2Y2FjNzQ5MzhiMTRh; ssid_ucp_v1=1.0.0-KDc4Y2VkZjIyN2JlMDNhYmNhYTFlYTE5ODM1YzI2YjVlZDNmMGY0N2YKGwiPluCxqYzbAhC29OKmBhjvMSAMOAZA9AdIBBoCbHEiIGMxZDFhYzFkMjIxOTgxNDlkZmM2Y2FjNzQ5MzhiMTRh; LOGIN_STATUS=1; _bd_ticket_crypt_cookie=861cdca903469f36dd23fc1ecfe847c1; __security_server_data_status=1; store-region=us; store-region-src=uid; d_ticket=28acd5a9c6df4227b13582669694acded6ede; __ac_nonce=064ec4f3a00901157c769; __ac_signature=_02B4Z6wo00f01ve8HKgAAIDD6.-iFWbfM-r3jRgAANkQTCm7UjsJOQlMGY7o-iPsCIAe0kuriDaQ15lHcML.nW.cGNWpSBLUJzdr6s8KHRbqh5ywvupCeAKBEHKKbji7hD1-Z0x3DI-n0KKx34; douyin.com; device_web_cpu_core=16; device_web_memory_size=-1; webcast_local_quality=null; publish_badge_show_info=%220%2C0%2C0%2C1693208382348%22; IsDouyinActive=true; home_can_add_dy_2_desktop=%220%22; strategyABtestKey=%221693208382.387%22; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1344%2C%5C%22screen_height%5C%22%3A756%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A16%2C%5C%22device_memory%5C%22%3A0%2C%5C%22downlink%5C%22%3A%5C%22%5C%22%2C%5C%22effective_type%5C%22%3A%5C%22%5C%22%2C%5C%22round_trip_time%5C%22%3A0%7D%22; VIDEO_FILTER_MEMO_SELECT=%7B%22expireTime%22%3A1693813183367%2C%22type%22%3A1%7D; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A1%7D; my_rd=1; passport_fe_beating_status=true; msToken=ESPx4FwNhcdEvr36-bmhWde9xupU_c64WeeqvvzqzLCtmEsvGPXhkwsKM8miaoC2w8gWSzNAfqxPEju4w3jzopIFompVSmwemq9-z1F8V-2vLNhTxLlYCUVdXkzNj6zM; download_guide=%221%2F20230828%2F0%22; csrf_session_id=3c194edf7f2cee968b0df65f97a11648; msToken=XFIGWeX20IGrrEUGYr_4SR2DPrduwK5zxB3gOp8FfbxW_Ng-w9uNh8wQRUIoPUtkSblL6msqte55jyfcrKPb8eDZekS9Q1P9hkdkPFiV4Ni-l9Vmsr0KgFo5MOkLaBZy; tt_scid=-i-7N5fAMRj8pGg4drGXbjasutdtD4tzIeqRnm6OJ1LoXRRZGl8FNhORnEuY3id.b3b7"
            // 其他请求头
        };
    }

    /**
     * @description get videoId by share url
     * @param {string} url 
     * @returns {string} videoId
     */
    getVideoIdByShareUrl(url) {
        const headers = {
            authority: 'v.douyin.com',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        }
        return new Promise((resolve, reject) => {
            fetch(url, headers).then((res) => {
                if (!res?.url) reject(new Error('can\'t get room id'))
                const videoId = res?.url?.match(/video\/(\d+)/)[1];
                if (!videoId) reject(new Error('can\'t get videoId, please check your url'))
                resolve(videoId)
            })
        })
    }

    getUserSecUidByShareUrl(url) {
        const headers = {
            authority: 'v.douyin.com',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        }
        return new Promise((resolve, reject) => {
            const reg = new RegExp('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
            const matchUrl = url.match(reg)
            if (!matchUrl || !matchUrl[0]) {
                reject('输入链接没有解析到地址')
            } else {
                fetch(matchUrl[0], headers).then((res) => {
                    if (!res?.url) reject('地址有误')
                    try {
                        const userSplitArr = new URL(res.url).pathname.split('user')
                        const sec_user_id = userSplitArr[userSplitArr.length - 1].replace('/', '')
                        resolve(sec_user_id)
                    } catch (e) {
                        reject('获取sec_uid失败')
                    }
                })
            }
        })
    }

    /**
    * @description get douyin videoId by url
    * @param {string} url 
    * @returns {string} videoId
    */
    async getDouyinVideoId(url) {
        const reg = new RegExp('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')
        const relUrl = url.match(reg)
        if (!relUrl || !relUrl[0]) {
            throw new Error("输入链接没有解析到地址")
        } else {
            let videoId = await this.getVideoIdByShareUrl(relUrl[0]);
            return videoId;
        }
    }
    /**
     * @description get videoData by video id
     * @param {string} videoId
     * @returns {object}v videoData
     */
    getDouyinVideoData(videoId) {
        let apiUrl = `https://www.douyin.com/aweme/v1/web/aweme/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=${videoId}&pc_client_type=1&version_code=190500&version_name=19.5.0&cookie_enabled=true&screen_width=1344&screen_height=756&browser_language=zh-CN&browser_platform=Win32&browser_name=Firefox&browser_version=110.0&browser_online=true&engine_name=Gecko&engine_version=109.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=&platform=PC&webid=7158288523463362079&msToken=abL8SeUTPa9-EToD8qfC7toScSADxpg6yLh2dbNcpWHzE0bT04txM_4UwquIcRvkRb9IU8sifwgM1Kwf1Lsld81o9Irt2_yNyUbbQPSUO8EfVlZJ_78FckDFnwVBVUVK`;
        const urlParser = new URL(apiUrl)
        const query = urlParser.search.replace('?', '')
        const xbogus = sign(query, this.headers['User-Agent'])
        console.log('【parser】 生成的X-Bogus签名为: ' + xbogus)
        const new_url = apiUrl + "&X-Bogus=" + xbogus
        console.log('【parser】 正在获取视频数据API: \n' + new_url)
        return new Promise((resolve, reject) => {
            fetch(new_url, {
                headers: this.douyinApiHeaders
            }).then(res => res.json())
                .then(json => {
                    resolve(json)
                })
                .catch(err => reject(err));
        })
    }

    /**
     * @description parser no watermark video url
     * @param {object} videoData 
     * @returns {string}
     */
    async getDouyinNoWatermarkVideo(videoData) {
        let url = videoData.aweme_detail.video.play_addr.url_list[0];
        let key = videoData.aweme_detail.video.play_addr.uri.replace('video/', '');
        let noWatermarkUrl = url.replace('/play/', '/playwm/') + '?video_id=' + key;
        return noWatermarkUrl;
    }

    /**
     * @description parser watermark video url
     * @param {object} videoData 
     * @returns {string}
     */
    async getDouyinWatermarkVideo(videoData) {
        return videoData.aweme_detail.video.download_addr.url_list[0];
    }

    async getDouyinImageUrls(videoData) {
        return videoData.aweme_detail.video.cover.url_list[0]
    }

    async parserVideoData(videoData) {
        const authInfo = getDeepProperty(videoData, 'aweme_detail.author')
        const video = getDeepProperty(videoData, 'aweme_detail.video')
        console.log(authInfo, video)
    }

    /**
     * @description download video to local
     */
    async downloadVideo(videoId, desc, dirname) {
        const videoData = await this.getDouyinVideoData(videoId)
        // await scraper.parserVideoData(douyinData)
        let url = await this.getDouyinNoWatermarkVideo(videoData);
        await download(url, dirname ? `media/${dirname}` : 'media', { filename: `${desc}.mp4` })
    }

    async getAllAuthorVideoTest(sec_user_id = 'MS4wLjABAAAA3HyIgnzQJNSwe-rozfXm_cPf50bEPfouUlk6wlPQcQEgijzHyTzj6zAt6s0KRaXz', max_cursor = 0) {
        let apiUrl = `https://www.douyin.com/aweme/v1/web/aweme/post/?aid=6383&channel=channel_pc_web&sec_user_id=${sec_user_id}&max_cursor={max_cursor}&webid=7259230874561693224`
        const urlParser = new URL(apiUrl)
        const query = urlParser.search.replace('?', '')
        const xbogus = sign(query, this.headers['User-Agent'])
        console.log('【parser】 生成的X-Bogus签名为: ' + xbogus)
        const new_url = apiUrl + "&X-Bogus=" + xbogus
        return new Promise((resolve, reject) => {
            fetch(new_url, {
                headers: this.douyinApiHeaders
            }).then(res => console.log(res.body))
                .then(json => {
                    console.log(json)
                    resolve(json)
                })
                .catch(err => reject(err));
        })
    }

    async getAllVideos(result, maxCursor, sec_uid) {
        let apiUrl = `https://www.iesdouyin.com/web/api/v2/aweme/post?sec_uid=${sec_uid}&count=20&max_cursor=${maxCursor}&aId=1128`;
        const res = await fetch(apiUrl, { headers: this.douyinApiHeaders })
        const data = await res.json()
        if (data.aweme_list && data.aweme_list instanceof Array) {
            const len = data.aweme_list.length
            if (len === 0 || result > 20) {
                return result
            } else {
                result = result.concat(data.aweme_list);
                maxCursor = data.max_cursor;
                result = await this.getAllVideos(result, maxCursor, sec_uid)
            }
        }
    }

    async getAuthorVideo(sec_uid) {
        let result = [];
        let maxCursor = 0;
        console.log('sec_uid:' + sec_uid)
        let apiUrl = `https://www.iesdouyin.com/web/api/v2/aweme/post?sec_uid=${sec_uid}&count=20&max_cursor=${maxCursor}&aId=1128`;
        const res = await fetch(apiUrl, { headers: this.douyinApiHeaders })
        const data = await res.json()
        if (data.aweme_list && data.aweme_list instanceof Array) {
            result = result.concat(data.aweme_list);
        }
        return result
    }
    /**
     * @description get author's all video
     */
    async getAllAuthorVideo(sec_uid) {
        // TODO: fininsh page 
        const result = await this.getAuthorVideo(sec_uid)
        const videoIds = result.map(i => this.downloadVideo(i.aweme_id, i.desc, sec_uid))
        Promise.allSettled(videoIds).then((results) => {
            const isHasFailed = results.filter(res => res.status === 'rejected')
            if (isHasFailed.length > 0) {
                const errorMsg = isHasFailed.map(i => i.reason).join(",")
                console.log('download failed:' + errorMsg)
            } else {
                console.log("all mission execed")
            }
        })
    }


    async test(sec_user_id = 'MS4wLjABAAAAx1JQivd74p1jMocy9aj3UQK4dj-FayClZT7lKqHXDdfw_3QDtuq0kHNH2lmJEHJQ') {
        let result = []
        let maxCursor = 0
        let awemeLen = 1;
        do {
            let apiUrl = `https://www.douyin.com/aweme/v1/web/aweme/post/?sec_user_id=${sec_user_id}&count=35&max_cursor=${maxCursor}&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333`;
            const urlParser = new URL(apiUrl)
            const query = urlParser.search.replace('?', '')
            const xbogus = sign(query, this.headers['User-Agent'])
            const new_url = apiUrl + "&X-Bogus=" + xbogus
            const headers = JSON.parse(JSON.stringify(this.douyinApiHeaders))
            headers.cookie += 'sessionid=c6bb98799c00f7e99f00dafbecea0920;'
            const res = await fetch(new_url, { headers })
            const data = await res.json()
            const { aweme_list, max_cursor } = data
            if (max_cursor) maxCursor = max_cursor
            awemeLen = aweme_list.length
            result = result.concat(aweme_list)
            // Delay for 3 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));
        } while (awemeLen > 0)
        // console.log('<><><>', result.map(i => i.desc))
        const authorName = getDeepProperty(result, '0.author.nickname')
        // console.log(authorName)
        const videoIds = result.map(i => this.downloadVideo(i.aweme_id, i.desc, authorName))
        Promise.allSettled(videoIds).then((results) => {
            const isHasFailed = results.filter(res => res.status === 'rejected')
            if (isHasFailed.length > 0) {
                const errorMsg = isHasFailed.map(i => i.reason).join(",")
                console.log('download failed:' + errorMsg)
            } else {
                console.log("all mission execed")
            }
        })
    }

    async getTodayVideo (sec_user_id) {
        
    }
}

module.exports = Scraper;
