'use strict';

namespace AsyncList {

    /**
     * 核心功功能描述
     * @class
     */
    interface AsyncListCoreDefinition {

        /**
         * 当一个cell函数执行成功时调用
         * @param result 返回结果
         */
        success(result: any): void;

        /**
         * 当要停止异步链时调用
         * @param result 返回结果
         */
        stop(result: any): void;

        /**
         * 异步链出现异常，需要停止时被调用
         * @param message 错误信息
         * @param result 返回结果
         */
        error(message: string, result: any): void;

        /**
         * 获取cell的返回值
         * @param index cell的序号
         * @returns 返回值
         */
        getResult(index: number): any;

        /**
         * 获取当前cell的序号
         */
        index(): number;

        /**
         * 获取cells长度
         */
        length(): number;

    }


    class AsyncListCore implements AsyncListCoreDefinition {

        /**
         * 构造方法
         * @param config 配置信息
         */
        public constructor(config: AsyncListConfig) {
            // 待完成
        }

        public success(result: any): void {
            // TODO : 待完成
        }

        public stop(result: any): void {
            // TODO : 待完成
        }

        public error(message: string, result: any) {
            // TODO : 待完成
        }

        public getResult(index: number): any {
            // TODO : 待完成
        }

        public index(): number {
            // TODO : 待完成
            return 0;
        }

        public length(): number {
            // TODO : 待完成
            return 0;
        }

    }

    /**
     * 执行单元
     */
    interface cellCore {
        (util: AsyncListCoreDefinition): void
    }

    /**
     * 配置类型
     */
    interface AsyncListConfig {

        begin?: Function,
        cells: cellCore[]
        end?: cellCore

    }

    class AsyncListConfigFactory {

        public static format(config : AsyncListConfig) : AsyncListConfig{
            // TODO : 待完成
            return config;
        }

    }

    /**
     * 门面函数
     * @function facadeFunc
     */
    const facadeFunc = function (): void {
        console.log("haha");
        if (arguments[0] === 'object')
            new AsyncListCore(AsyncListConfigFactory.format(<AsyncListConfig>arguments[0]))
    };

    // 初始化
    if (typeof window === 'object')
        window['L'] = window['asyncList'] = facadeFunc;
    else
        throw new Error('非浏览器环境');

}