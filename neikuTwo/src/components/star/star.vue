<template>
	<div class="star" :class="starType">
		<div class="boxs"><span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span></div>
	</div>
</template>

<script>
	const LENGTH=5;
	const CLS_ON= 'on';
	const CLS_HALF= 'half';
	const CLS_OFF= 'off';
	
	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		created() {
			
		},
		computed:{
			starType(){
				return 'star-'+this.size
			},
			itemClasses(){
				let result=[];
				let score=Math.floor(this.score*2)/2;
				let hasDecimak =score%1!=0;
				let integer= Math.floor(score);
				for (let i=0; i<integer;i++){
					result.push(CLS_ON)
				}
				if(hasDecimak){
					result.push(CLS_HALF)
				}
				while(result.length<LENGTH){
					result.push(CLS_OFF)
				}
				return result
			}
		}
	};
</script>

<style lang="scss" scoped="">
@import "../../common/sass/tongyongyangshi.scss";
@import "star";
</style>