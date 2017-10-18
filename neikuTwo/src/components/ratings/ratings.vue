<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star class="star" :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star class="star" :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect @onlyContent='thisonlyContent' @ratingtypeselect="ratingtypeselect" :selecttype='selecttype' :onlyContent='onlyContent' :desc="desc" :ratings='rating'></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in rating" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" alt="" />
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star class="star" :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="delivery">
									{{rating.deliveryTime}}
								</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend.length">
								<span class="icon-add_circle"></span>
								<span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDates}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../star/star';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../common/js/date'
	const ALL=2;
	const ERR_OK=0;
	export default{
		filters:{
			formatDates(time){
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split,
			ratingselect
		},
		data() {
			return {
				rating:[],
				showFlag:false,
				selecttype:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'满意',
					negative:'不满意'
				},
				delivery:true
			}
		},
		mounted() {
			this.showFlag= true;
			this.selecttype=ALL;
			this.onlyContent=true;
			this.$http.get('./api/ratings').then((response) => {
				response = response.body;
				if(response.errno===ERR_OK){
						this.rating = response.data
						this.$nextTick(() => {
							if(!this.scroll){
								this.scroll= new BScroll(this.$refs.ratings,{
									click:true
								})
							}else{
								this.$nextTick(() => {
									this.scroll.refresh()
								})
							}
						});
				}
			})
		},
		methods:{
			ratingtypeselect(type){
				this.selecttype=type
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			thisonlyContent(){
				this.onlyContent=!this.onlyContent
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			needShow(type,texts){
				if(this.onlyContent && !texts){
					return false
				}
				if(this.selecttype === ALL){
					return true
				}else{
					return type === this.selecttype
				}
			}
		}
	};
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "ratings";
</style>