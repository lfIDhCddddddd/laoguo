<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star class="star" :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">{{seller.minPrice}}
							<span class="stress">元</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">{{seller.deliveryPrice}}
							<span class="stress">元</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">{{seller.deliveryTime}}
							<span class="stress">分钟</span>
						</div>
					</li>
				</ul>
				<div class="favorites">
					<span class="icon-keyboard_arrow_right iconfavorite" @click="favorites" :class="{'iconfavorites':favoritez}"></span>
					<span class="text">{{favoritrText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1>公告与活动</h1>
				<div class="content-wrapper">
					<div class="content">{{seller.bulletin}}</div>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item border" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1>商家实景</h1>
				<div class="pic-wrapper" ref="pic">
					<ul class="pic-list" ref="picul">
						<li class="pic-item" v-for="item in seller.pics">
							<img :src="item" alt="" />
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1>商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import star from '../star/star';
import split from '../split/split';
import BScroll from 'better-scroll';
import {saveToLocal,loadFromLocal} from '../../common/js/store'
	export default{
		props: {
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split,
		},
		data() {
			return {
				favoritez:(() => {
					return loadFromLocal(this.seller.id,'favoritez',false)
				})()
			}
		},
		computed:{
			favoritrText(){
				return this.favoritez ? '已收藏' : '收藏'
			}
		},
		created() {
			this.classMap=['decrease','discount','guarantee','invoice','special'];
		},
		mounted() {
			let picWidth=2.4;
			let margin=0.12;
			let widths=(picWidth+margin)*this.seller.pics-margin;
			this.$refs.picul.style.watch=widths;
			this.$nextTick (() => {
				if(!this.scroll){
					this.scroll= new BScroll(this.$refs.seller,{
						click:true
					})
					this.picscroll= new BScroll(this.$refs.pic,{
						scrollX:true,
						eventPassthrough:'vertical'
					})
				}else{
					this.$nextTick(() => {
						this.scroll.refresh()
						})
					}
				});
		},
		methods:{
			favorites(){
				this.favoritez=!this.favoritez;
				saveToLocal(this.seller.id,'favoritez',this.favoritez)
			}
		}
	}
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "seller";
</style>