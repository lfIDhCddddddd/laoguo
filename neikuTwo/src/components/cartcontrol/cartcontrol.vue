<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease " v-show="food.count>0" @click.stop="decreaseCart">
				<div class="icon-close inner"></div>
			</div>
			
		</transition>

		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-thumb_up" @click.stop="addCart" ref="addclass">

		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data() {
			return {
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
				],
				dropsBall:[],
				addclass:"",
				num:0
			}
		},
		mounted() {
			this.addclass=this.$refs.addclass
			this.$emit("add",this.addclass)
		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);
					this.food.count=1;
				}else{
					this.food.count++
				}
				this.$emit('cartadd',event.target)
				
			},
			decreaseCart(event){
				if(!event._constructed){
					return
				}
				if(this.food.count){
					this.food.count--
				}
			},
			drop(el){
				console.log(el)
				for (let i=0;i<thie.balls.length;i++){
					let ball=this.balls[i]
					if(!ball.show) {
						ball.show=true
						ball.el=el
						this.dropsBall.push(ball)
						return;
					}
				}
			},
			
		}
	};
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "cartcontrol";
@import "../../common/stylus/style.css";
</style>