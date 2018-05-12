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

    /**
     * 用于调度异步链
     * @class
     */
    class AsyncListCore implements AsyncListCoreDefinition {

        /**
         * 游标，用于记录执行到第几个cell
         */
        public cursor: number = -1;

        /**
         * 用于记录cell的返回值
         */
        public resultList: Array<any> = [];

        /**
         * Asyn List Conifg
         */
        public config: AsyncListConfig;

        /**
         * 构造方法
         * @param config 配置信息
         */
        public constructor(config: AsyncListConfig) {
            this.config = config;
            // 在异步链执行前执行begin函数
            if (typeof config.begin === 'function')
                config.begin.call(this);
            // 当异步链长度不为零，正常执行异步链
            if (config.cells.length != 0)
                this.runNextCell();
        }

        /**
         * 游标向后移动，执行下一个cell
         */
        private runNextCell(): void {
            this.cursor++; // 游标向后移动
            if (this.cursor < this.config.cells.length)
                this.config.cells[this.cursor].call(this, this, this.resultList.length == 0 ? null : this.resultList[this.resultList.length - 1]);
            else {
                if (typeof this.config.end === 'function')
                    this.config.end.call(this);
            }
        }

        /**
         * 当cell执行成功时被调用
         * @param result 返回值
         */
        public success(result: any): void {
            if (this.cursor >= 0)
                this.resultList.push(result);
            this.runNextCell();
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
        (util: AsyncListCoreDefinition, previousResult: any): void
    }

    /**
     * 配置类型
     */
    interface AsyncListConfig {

        begin?: Function,
        cells: cellCore[]
        end?: cellCore

    }

    /**
     * AsyncListConfig构造
     */
    class AsyncListConfigFactory {

        /**
         * 将AsyncListConfig标准化
         * @param config 
         */
        public static format(config: any): AsyncListConfig {
            if (!(config.cells instanceof Array))
                throw new Error('缺少配置项cells:Array!');
            if (typeof config.begin !== "function")
                config.begin = function () { };
            if (typeof config.end !== "function")
                config.end = function () { };
            return <AsyncListConfig>config;
        }

        /**
         * 将一串cell函数狗造成AsyncListConfig
         * @param cells cell function list
         */
        public static create(...cells: any[]) {
            let config: AsyncListConfig = { cells: [] };
            for (let cell of cells) {
                if (typeof cell === 'function')
                    config.cells.push(cell);
            }
            return this.format(config);
        }

    }

    /**
     * 门面函数
     * @function facadeFunc
     */
    const facadeFunc = function (): void {
        console.log("haha");
        if (arguments.length == 0)
            throw new Error('asyncList必须传入参数');
        if (typeof arguments[0] === 'object')
            new AsyncListCore(AsyncListConfigFactory.format(arguments[0]))
        else
            new AsyncListCore(AsyncListConfigFactory.create(arguments));
    };

    // 初始化
    if (typeof window === 'object')
        window['L'] = window['asyncList'] = facadeFunc;
    else
        throw new Error('非浏览器环境');

}