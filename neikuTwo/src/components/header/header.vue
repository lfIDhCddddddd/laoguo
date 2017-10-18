<template>
<div class="headerbox">
	<transition name="fade">
		<div class="detail" v-show="detailShow" @click="showFalse">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="box">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="(item,index) in seller.supports">
							<span class="icon" :class="classMap[seller.supports[index].type]"></span>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div> 
				</div>
			</div>
			<div class="detail-close" >
				<i class="icon-closes icon-remove_circle_outline"></i>
			</div>
		</div>
	</transition>
	
	<div class="header">
		<div class="background">
			<img :src="seller.avatar"  alt="" />
		</div>
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar"  alt="" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="names">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon"  :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}},</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-add_circles icon-favorite"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-add_circles icon-favorite"></i>
		</div>
	</div>
</div>
</template>

<script>
	
import star from '../star/star';

	export default{
		props: {
			 seller: {
			 	type:Object
			 },
		},
		data () {
			return{
				detailShow:false,
				msg:this.seller,
				msgs:this.sellerSupports
			}
		},
		methods:{
			showDetail() {
				this.detailShow=true
			},
			showFalse() {
				this.detailShow=false
				
			}
		},
		created() {
			this.classMap=['decrease','discount','guarantee','invoice','special'];

		},
		components:{
			star
		}
		
	}
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "./header";
@import "../../common/stylus/style.css";
</style>