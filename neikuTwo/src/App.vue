<template>
  <div id="app">
  	<headers :seller="seller"></headers>
  	<div class="tab">
  		<div class="tab-item">
  			<router-link to='/goods'>
  				商品
  			</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link  to='/ratings'>
  				评论
  			</router-link>
  		</div>
  		<div class="tab-item">
  			<router-link  to='/seller'>
  				商家
  			</router-link>
  		</div>
  	</div>
  	<router-view :seller='seller' :sellerSupports='seller.supports'></router-view>
  	<div class="content">
  	</div>
  </div>
</template>
<script>
import header from './components/header/header';
import {urlParse} from './common/js/util'
const ERR_OK=0
export default {
  data () {
		return {
			seller:{
				id: (() => {
					let queryParam = urlParse()
					console.log(queryParam)
					return queryParam.id
				})()
			},
		};
	},
	created() {
		this.$http.get('./api/seller?id=').then((response) => {
			response = response.body;
			if(response.errno===ERR_OK){
					this.seller = Object.assign({}, this.seller, response.data);
			}
		})
	},
  components: {
  	'headers':header,
  }
}
</script>
<style lang="scss" >
@import "src/common/sass/tongyongyangshi.scss";
 #app .tab{
 	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
 }
 .tab-item{
 	flex:1;
 	text-align: center;
 }
</style>