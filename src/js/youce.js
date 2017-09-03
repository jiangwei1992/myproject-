/* 
* @Author: Marte
* @Date:   2017-09-03 21:11:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-03 21:23:17
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
        "commom":"../lib/common"
    }
})

require(["jquery","commom"],function($){
    $('.dh').load('./footer.html .broadside',function(){
                
    });

})