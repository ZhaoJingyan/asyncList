'use strict';

namespace AsyncList {

    /**
     * 门面函数
     */
    const facadeFunc = function () : void {
        console.log("haha");
    };

    // 初始化
    if(typeof window === 'object')
        window['L'] = window['asyncList'] = facadeFunc;
    else
        throw new Error('非浏览器环境');
    
}