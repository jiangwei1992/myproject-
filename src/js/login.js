/* 
* @Author: Marte
* @Date:   2017-09-03 19:43:27
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-03 19:43:42
*/

require.config({
    paths:{
        "jquery":"../lib/jquery-3.2.1",
        "commom":"../lib/common"
    }
})

require(["jquery","commom"],function($){
    $('footer').load('./footer.html .Copyright',function(){
                
    });

})