/* 
* @Author: jiangwei
* @Date:   2017-09-02 17:42:46
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-02 20:29:25
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