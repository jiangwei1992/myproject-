/* 
* @Author: Marte
* @Date:   2017-09-05 20:33:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-05 22:03:16
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
    }

})

require(["jquery"],function($){
    $('.goods_top').load('./footer.html header');
    $('.goods_footer').load('./footer.html footer');
    require(["nav","youcebase"],function(){

    })


})