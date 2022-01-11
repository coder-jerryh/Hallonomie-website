new Vue({
  el:'#myApp',
  data () {
    return {
      merchantCode: '',
      showInput: true,
      loadingSuccess: true,
      show: false,
      language: 'de',
      merchant: '',
      num: 1,
      timer: null,
      lists: [
        {
          titleDe: 'In Zubereitung',
          title: '准备中',
          // nums: [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
          nums: [],
          hidden: false
        },
        {
          titleDe: 'Bitte abholen!',
          title: '做好了!',
          // nums: [3,2,1],
          nums: [],
          hidden: false
        },
        {
          titleDe: 'Abholbereit (Abholcode)',
          title: '等待取餐',
          // nums: [1,2,3,4,5,6],
          nums: [],
          hidden: false
        }
      ]
    }
  },
  created() {
    this.verify()
  },
  methods: {
    verify() {
      const query = location.search.split('&')
      this.merchantCode = query[0].replace('?_=', '') || localStorage.merchantCode
      if (query[1]) {
        this.language = query[1].replace('l=', '')
      }
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    init() {
      this.getData()
      this.timer = setInterval(() => {
        this.getData()
      }, 8000)
    },
    getData() {
      axios.get(`https://hallonomie.halloway.net/merchant/${this.merchantCode}/order/recent`).then(res => {
        this.show = true
        const { code, data } = res.data
        if (code === 1) {
          var processLists = data.process
          if (processLists && processLists.length) {
            this.lists[0].nums = processLists.slice(0, 21)
          } else {
            this.lists[0].nums = []
          }
          var completeLists = data.complete
          if (completeLists && completeLists.length) {
            this.lists[1].nums = completeLists.slice(0, 3)
            this.lists[2].nums = completeLists.slice(3, 13)
          } else {
            this.lists[1].nums = []
            this.lists[2].nums = []
          }
        }
        this.loadingSuccess = true
      })
    },
    submit() {
      localStorage.merchantCode = this.merchantCode
      this.showInput = false
      this.init()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
})