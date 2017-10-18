<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="selects(2,$event)" class="block positive" :class="{'active1':selecttype===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="selects(0,$event)" class="block positive" :class="{'active1':selecttype===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="selects(1,$event)" class="block negative" :class="{'active2':selecttype===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
			<span class="icon-shopping_cart"></span>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>

//<script>
	const POSITIVE=0;
	const NEGATIVE=1;  
	const ALL=2;
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selecttype:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		computed:{
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				})
			}
		},
		methods:{
			selects(type,event){
				if(!event._constructed){
					return;
				}
				this.$emit('ratingtypeselect',type)
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				console.log(this.onlyContent)
				this.$emit('onlyContent',this.onlyContent)
			}
		}
	};
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "ratingselect";
</style>