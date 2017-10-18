<template>
	<div class="shopcart" ref="shopcart">
		<div class="content">
			<div class="content-left" @click="toggleList">
				<div class="logo-wrapper">
					<div class="logo" :class="{'hightlight':totalCount>0}">
						<i class="icon-check_circle" :class="{'i':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'hightlight':totalCount>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="patClass">{{payDesc}}</div>
			</div>
		</div>
		<transition name="fold">
				
				<div class="shopcart-list" v-show="listShow" >
					<div class="moban" v-show="listShow" @click="toggleList"></div>
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
						<div class="list-content" ref="listcontent">
							<ul>
								<li class="food" v-for="food in selectFoods">
									<span class="name">{{food.name}}</span>
									<div class="price">
										<span >￥{{food.price*food.count}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</li>
							</ul>
						</div>
				</div>
			
		</transition>
	</div>
</template>

<script>
	import cartcontrol from '../cartcontrol/cartcontrol';
	import BScroll from 'better-scroll';
	export default {
		components:{
			cartcontrol
		},
		data(){
			return {
				fold:true,
				msg:1
			}
		},
		props:{
			selectFoods:{
				type:Array,
				default(){
					return []
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food) => {
					total+= food.price* food.count
				})
				return total
			},
			totalCount(){
				let count=0;
				this.selectFoods.forEach((food) => {
					count+= food.count
				})
				return count
			},
			payDesc() {
				if(this.totalPrice===0){
					return `${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let diff=this.minPrice - this.totalPrice
					return `还差￥${diff}元起送`
				}else{
					return '去结算'
				}
			},
			patClass() {
				if(this.totalPrice<this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			},
			listShow() {
				if(!this.totalCount){
					this.fold=true
					return false
				}
				let show=!this.fold
				if(show){
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll= new BScroll(this.$refs.listcontent,{
								click:true
							})
						}else{
							this.scroll.refresh()
						}
						
					})
				}
				return show
			}
		},
		methods:{
			toggleList(){
				if(!this.totalCount){
					return
				}
				this.fold=!this.fold
			},
			empty(){
				this.selectFoods.forEach((food) => {
					food.count=0
				})
			}
		},
		
	};
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "shopcart";
</style>