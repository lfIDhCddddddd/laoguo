<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
					 @click="selectMenu(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li  v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
							<div class="icon" >
								<img :src="food.icon" alt="" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add="cartb" :food="food" @cartadd='carts'></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		
		<shopcart   :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
		<food :food="selectedFood" ref='food'></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from '../shopcart/shopcart';
	import food from '../food/food';
	import cartcontrol from '../cartcontrol/cartcontrol';
	
	const ERR_OK=0;
	export default{
		components:{
			shopcart,
			cartcontrol,
			food
		},
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			};
		},
		computed:{
			currentIndex() {
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods=[]
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		methods:{
			carts(target){
//				console.log(target)
				
			},
			selectFood(food, event){
				if(!event._constructed){
					return
				}
				this.selectedFood=food
				this.$refs.food.show()
			},
			cartb(target){
				
			},
			initScroll(){
				this.meunScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.footScroll = new BScroll(this.$refs.foodWrapper,{
					click:true,
					probeType : 3
				});
				this.footScroll.on('scroll',(pos) => {
					this.scrollY=Math.abs(Math.round(pos.y));
				})
			},
			calculateHeight(){
				let foodList= this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item=foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index,event){
				if(!event._constructed){
					return
				}
				let foodList= this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.footScroll.scrollToElement(el,300);
			},
			_drop(target){
				this.$refs.shopcart.drop(target);
				
			},
//			addclass(){
//				console.log("clico")
//			}
		},
		created() {
			this.classMap=['decrease','discount','guarantee','invoice','special'];
			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if(response.errno === ERR_OK){
					this.goods=response.data;
					this.$nextTick(() => {
						this.initScroll();
						this.calculateHeight();
					})
					
				}
			})
			
		},
	}
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "goods";
</style>