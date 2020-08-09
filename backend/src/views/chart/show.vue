<template>
  <el-row>
    <el-col :span="24">
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="beginDate"
                        type="date"
                        clearable
                        placeholder="选择日期"
                       value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
            </el-form-item>
             <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="endDate"
                        type="date"
                        clearable
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <div id="chart" style="width:900px;height: 600px"></div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts';
import staApi from '@/api/statistics';
export default {
    data(){
        return {
            beginDate: "",
            endDate: "", 
            options: {
                title: {
                    text: '统计数据'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                },
                    dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 35
        },
        {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '93%',
            start: 29,
            end: 36
        },
        {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 35
        },
        {
            type: 'inside',
            yAxisIndex: [0],
            start: 29,
            end: 36
        }
    ],
                legend: {
                    data: ['注册人数', '登陆人数', '视频播放量', '新增课程数']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '注册人数',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '登陆人数',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频播放量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '新增课程数',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                ]
            }
        }
    },
    chart: null,
    mounted(){
        this.chart = echarts.init(document.getElementById('chart'));
    },
    methods: {
        doSearch(){
            console.log(this.beginDate,this.endDate);
            if (this.beginDate.length > 0 && this.endDate.length > 0){
                staApi.getStatisticsBetween(this.beginDate,this.endDate).then(res=>{
                    let { sta } = res.data;
                    this.options.xAxis[0].data = sta.date;
                    this.options.series.forEach(item => {
                       switch(item.name) {
                           case "注册人数":
                               item.data = sta.registerNum;
                            break;
                           case "登陆人数":
                               item.data = sta.loginNum;
                           break;
                           case "视频播放量":
                               item.data = sta.videoViewNum;
                           break;
                           default:
                               item.data = sta.courseNum;
                       }
                    });
                    this.chart.setOption(this.options);
                });
            }
            
        }
    }

}
</script>

<style>

</style>