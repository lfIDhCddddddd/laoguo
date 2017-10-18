<template>
	<transition name="move" >
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content" >
				<div class="image-header" >
					<img :src="food.image" />
					<div class="back">
						<i class="icon-thumb_down" @click="hide"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name='buy'>
						<div class="buy" v-show="!food.count || food.count===0" @click="addFirst">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">
						商品信息
					</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect @onlyContent=thisonlyContent @ratingtypeselect="ratingtypeselect" :selecttype='selecttype' :onlyContent='onlyContent' :desc="desc" :ratings='food.ratings'></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span><img class="avatar" :src="rating.avatar" alt="" />
								</div>
								<div class="time">{{rating.rateTime | formatDates}}</div>
								<p class="text">
									<span class="span1" :class="{'icon-add_circle':rating.rateType===0,'icon-arrow_lift':rating.rateType===1}"></span>
									<span class="span2">{{rating.text}}</span>
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings ||  !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import cartcontrol from '../cartcontrol/cartcontrol';
	import split from '../split/split';
	import ratingselect from '../ratingselect/ratingselect';
	import {formatDate} from '../../common/js/date'
//	const POSITIVE=0;
//	const NEGATIVE=1;  
	const ALL=2;
	export default{
		components:{
			cartcontrol,
			split,
			ratingselect
		},
		props:{
			food:{
				type:Object
			}
		},
		filters:{
			formatDates(time){
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		data(){
			return {
				showFlag:false,
				selecttype:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		methods:{
			show(){
				this.showFlag= true;
				this.selecttype=ALL;
				this.onlyContent=true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll= new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.$nextTick(() => {
							this.scroll.refresh()
						})
					}
				});
			},
			hide(){
				this.showFlag= false
			},
			addFirst(event){
				if(!event._constructed){
					return
				}
				Vue.set(this.food,'count',1)
//				this.$emit('cartadd',event.target)
			},
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
	}
</script>
<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "food";
</style>