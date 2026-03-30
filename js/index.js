// 柱状图1模块
(function() {
    // 1. 初始化 ECharts 实例
    var myChart = echarts.init(document.querySelector('.bar .chart'));

    // 2. 准备数据源：把我们新的数据塞进原模板的 dataAll 数组里
    var dataAll = [
        {
            name: "极致秘境", // 对应 h2 里的第一个 a 标签 (索引 0)
            categories: ['西藏', '四川', '新疆', '云南', '黑龙江', '贵州', '湖南', '广西', '江西', '广东'],
            values: [41, 36, 33, 25, 20, 10, 9, 9, 8, 8]
        },
        {
            name: "高潜小众", // 对应 h2 里的第二个 a 标签 (索引 1)
            categories: ['新疆', '西藏', '云南', '四川', '内蒙古', '甘肃', '广东', '黑龙江', '河南', '辽宁'],
            values: [240, 173, 136, 130, 96, 82, 78, 73, 72, 59]
        }
    ];

    // 3. 基础样式配置 (大屏高级风格)
    var option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { 
            top: '10px',
            left: '0%',
            right: '0%',
            bottom: '4%',
            containLabel: true },
        xAxis: {
            type: 'category',
            // 默认先加载第一组（极致秘境）的 X 轴数据
            data: dataAll[0].categories,
            axisLabel: { color: 'rgba(255,255,255,.7)', interval: 0, rotate: 30 },
            axisTick: { show: false },
            axisLine: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '景点数量 (个)',
            nameTextStyle: { color: 'rgba(255,255,255,.7)', padding: [0, 30, 10, 0] },
            axisLabel: { color: 'rgba(255,255,255,.7)' },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#012f4a' } }
        },
        series: [{
            name: '景点数量',
            type: 'bar',
            barWidth: '35%',
            // 默认先加载第一组（极致秘境）的 Y 轴数据
            data: dataAll[0].values,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#00E5FF' },
                    { offset: 1, color: '#0072FF' }
                ]),
                borderRadius: [4, 4, 0, 0]
            },
            label: { show: true, position: 'top', color: 'rgba(255,255,255,.7)' }
        }]
    };

    // 4. 首次渲染图表
    myChart.setOption(option);

    // 5. 点击切换逻辑 (采用原模板的 jQuery 写法，极其丝滑)
    $(".bar h2").on("click", "a", function() {
        // 获取当前点击的是第几个 a 标签 (0 或 1)
        var index = $(this).index();

        // 同时替换掉 X 轴省份名字 和 柱子的数据
        option.xAxis.data = dataAll[index].categories;
        option.series[0].data = dataAll[index].values;

        // 重新渲染
        myChart.setOption(option);
    });

    // 6. 监听窗口缩放，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();


// =========================================================
// 折线图定制 (已修复排版拥挤、文字重叠和右侧被切的问题)
// =========================================================
(function() {
  var myChart = echarts.init(document.querySelector(".line .chart"));

  var option = {

    // 1. 【完美对齐方案】：把图例拆分成左右两组
    legend: [
      {
        // 第一组：单独放“景点数量”
        top: '3%',       // 稍微往下一点，和右边两行的中间对齐
        left: '15%',     // 靠左一点，你可以根据大屏实际宽度微调这个百分比
        textStyle: { color: 'rgba(255,255,255,.7)' },
        data: ['景点数量']
      },
      {
        // 第二组：黄绿两个图例垂直排列
        top: '-1%',       // 往上提一点，给两行留出空间
        left: '40%',     // 放在红色图例的右侧，根据需要微调百分比
        orient: 'vertical', // 【关键修改】：改为垂直排列，强制黄绿两行左侧对齐！
        itemGap: 6,      // 两行图例之间的上下间距
        textStyle: { color: 'rgba(255,255,255,.7)' },
        data: ['入门：高潜小众区 (Top 6.7%)', '极致：极客秘境区 (Top 1%)']
      }
    ],

    // 2. 【核心修复】：把四面的边距全部拉大！
    grid: {
      top: '20px',    // 往下压，给上方的双行图例留出绝对充足的空间
      left: '0%',
      right: '4%',  // 加大右侧边距，保证“综合得分”四个字能完全显示
      bottom: '0%', // 加大底部边距，防止 X 轴倾斜的文字被挡住
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },
    tooltip: { trigger: 'axis' },

    yAxis: {
        type: 'value',
        // 【修改点1】：把轴标题的单位改成千个
        name: '景点数量 (千个)',
        nameTextStyle: {
            color: 'rgba(255,255,255,.7)',
            padding: [0, 0, 5, -20] // 如果标题和刻度挤，可以稍微调一下 padding
        },
        axisLabel: {
            fontSize: 12,
            color: 'rgba(255,255,255,.7)',
            // 【修改点2】：用 formatter 把原本的数值除以 1000
            formatter: function (value) {
                if (value === 0) return 0; // 0 还是显示 0
                return value / 1000;       // 15000 会变成 15
            }
            // 如果你更喜欢数字后面直接带个千字，比如“15千”，可以用下面这行代替：
            // formatter: '{value} 千'
        },
        splitLine: {
            lineStyle: { color: 'rgba(255,255,255,.1)' }
        }
    },


   xAxis: {
      type: 'category',
      name: '综合得分',
      // 【修改点1】：把位置从 'end' 改为 'center' (居中)
      nameLocation: 'center',
      // 【修改点2】：设置名字跟X轴的垂直距离。
      // 因为你的刻度标签（比如 90-95）倾斜了45度，占了一些往下伸展的空间，
      // 所以这个距离要稍微设大一点（推荐 40~50 左右），防止“综合得分”和数字打架。
      nameGap: 45,
      // 删掉之前的 padding，保持纯粹的文字样式
      nameTextStyle: { color: 'rgba(255,255,255,.7)' },

      boundaryGap: false,
      axisLabel: { rotate: 45, color: 'rgba(255,255,255,.7)' },
      axisTick: { show: false },
      axisLine: { show: false },
      data: ['0-5', '5-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40',
      '40-45', '45-50', '50-55', '55-60', '60-65', '65-70', '70-75', '75-80',
      '80-85', '85-90', '90-95', '95-100']
    },



    series: [
      // --- 真正渲染数据的折线图 ---
      {
        name: '景点数量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        // 我看你图5改成了红色，这里帮你写好红色渐变，和原模板保持一致
        itemStyle: { color: '#ed3f35' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(237, 63, 53, 0.7)' },
              { offset: 1, color: 'rgba(237, 63, 53, 0.1)' }
            ]
          }
        },
        data: [0, 0, 0, 1, 8, 53, 130, 510, 2291, 5339, 12639, 7340, 1761, 233, 34, 4, 1, 0, 1, 0],

        // 辅助线
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false }, // 这一行极其重要，防止出现你图2图3那种文字重叠的灾难
          data: [
            { xAxis: '60-65', lineStyle: { type: 'dashed', color: '#FFD700', width: 2 } },
            { xAxis: '65-70', lineStyle: { type: 'dashed', color: '#00d887' , width: 2 } }
          ]
        }
      },

      // --- 假系列，生成图例 ---
      {
        name: '入门：高潜小众区 (Top 6.7%)',
        type: 'line',
        color: '#FFD700',
        symbol: 'circle',
        symbolSize: 0.5,
        lineStyle: { type: 'dashed', width: 2 },
        data: []
      },
      {
        name: '极致：极客秘境区 (Top 1%)',
        type: 'line',
        color: '#00d887',
        symbol: 'circle',
        symbolSize: 0.5,
        lineStyle: { type: 'dashed', width: 2 },
        data: []
      }
    ]
  };



  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();






// 环形饼图模块
(function() {
    var myChart = echarts.init(document.querySelector('.pie .chart')); // 换成你实际的 DOM 容器名

    // 1. 这里放你 Python 脚本跑出来的实际数据
    var pieData = [
        { value: 850, name: '🏞️ 山岳与地质奇观' },
        { value: 620, name: '💧 野生水系与湖泊' },
        { value: 430, name: '🏯 遗落的人文古迹' },
        { value: 310, name: '🏡 原生态避世村落' },
        { value: 250, name: '🌲 生态与自然保护区' },
        { value: 120, name: '🌀 综合及其他微型景观' }
    ];

    var option = {
        // 2. 科技感配色盘（科技蓝、电光紫、明黄、翠绿、朱红等，完美适配暗黑大屏）
        color: ['#00E5FF', '#0072FF', '#8A2BE2', '#FFD700', '#00d887', '#ed3f35'],

        // 3. 悬浮提示框样式优化
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(1, 47, 74, 0.8)', // 采用网格同款深蓝底色
            borderColor: '#00E5FF',
            textStyle: { color: '#fff' },
            formatter: '{a} <br/>{b}: {c}个 ({d}%)' // 显示：系列名、类别名、数值、百分比
        },

        // 4. 图例排版 (放右边垂直排列，防止和饼图打架)
      legend: {
            orient: 'vertical',
            right: '0%',  // 之前可能是 2%，改成 0% 让图例彻底靠右
            top: 'center',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: 'rgba(255,255,255,.7)',
                fontSize: 12
            }
        },

        series: [
            {
                name: '小众秘境资源类型',
                type: 'pie',
                radius: ['40%', '65%'],

                // 【修改2】：把饼图的圆心往左移！
                // 第一个值是左右位置，把 35% 改小，比如改成 25% 或 28%
                center: ['30%', '50%'],

                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 5,
                    borderColor: '#012f4a',
                    borderWidth: 3
                },
                label: {
                    show: true,
                    color: 'rgba(255,255,255,.7)',
                    formatter: '{d}%'
                },

                // 【修改3】：缩短这根讨厌的引线
                labelLine: {
                    lineStyle: { color: 'rgba(255,255,255,.3)' },
                    smooth: 0.2,
                    length: 5,   // 第一段线缩短 (原来是10)
                    length2: 8   // 第二段横线缩短 (原来是15)
                },
                data: pieData
            }
        ]
    };
    myChart.setOption(option);

    // 监听窗口缩放，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();




// 学习进度柱状图模块
// 词云图 - 双 Tab 切换模块 (大屏科技风格完美统一 + 彩色溢出修复版)
(function() {
    // 1. 获取 DOM 容器 (确保 HTML 中有对应的 .wordcloud-panel)
    var chartDom = document.querySelector('.wordcloud-chart');
    if (!chartDom) {
        console.warn("⚠️ 找不到词云图容器 .wordcloud-chart，跳过渲染！");
        return;
    }

    // 2. 初始化 myChart 实例
    var myChart = echarts.init(chartDom);

    // 3. 准备好的两组词云数据 (已清理为非 np.XX 格式)
    var wordCloudData = {
        '小众特征': [
            { name: '遗址', value: 2510 }, { name: '生态', value: 1914 }, { name: '自然', value: 1847 },
            { name: '湿地', value: 1715 }, { name: '森林', value: 1592 }, { name: '基地', value: 1454 },
            { name: '峡谷', value: 1360 }, { name: '独特', value: 1216 }, { name: '草原', value: 1198 },
            { name: '壮观', value: 919 }, { name: '县城', value: 827 }, { name: '小镇', value: 819 },
            { name: '高山', value: 705 }, { name: '民俗', value: 704 }, { name: '古朴', value: 653 },
            { name: '原始', value: 639 }, { name: '自然景观', value: 627 }, { name: '溶洞', value: 621 },
            { name: '植被', value: 584 }, { name: '民居', value: 583 }, { name: '清澈', value: 532 },
            { name: '奇特', value: 513 }, { name: '地貌', value: 513 }, { name: '泉水', value: 511 },
            { name: '农场', value: 506 }, { name: '乡村', value: 504 }, { name: '秀丽', value: 504 },
            { name: '湖泊', value: 503 }, { name: '冰川', value: 452 }, { name: '田园', value: 429 },
            { name: '原始森林', value: 418 }, { name: '奇石', value: 408 }, { name: '石林', value: 403 },
            { name: '群山', value: 402 }, { name: '自然风光', value: 395 }, { name: '飞瀑', value: 395 },
            { name: '神秘', value: 394 }, { name: '地质', value: 394 }, { name: '野生动物', value: 377 },
            { name: '迷人', value: 372 }, { name: '龙潭', value: 370 }, { name: '鸟类', value: 365 },
            { name: '悬崖', value: 363 }, { name: '免费', value: 360 }, { name: '古道', value: 355 },
            { name: '秀美', value: 350 }, { name: '探险', value: 346 }, { name: '村落', value: 346 },
            { name: '珍稀', value: 341 }, { name: '徒步', value: 334 }
        ],
        '大众特征': [
            { name: '博物馆', value: 4196 }, { name: '广场', value: 3212 }, { name: '主题', value: 1456 },
            { name: '古城', value: 1440 }, { name: '古镇', value: 1438 }, { name: '旅游区', value: 1319 },
            { name: '文物', value: 1251 }, { name: '全国', value: 1148 }, { name: '纪念馆', value: 1098 },
            { name: '乐园', value: 1093 }, { name: '沙滩', value: 1035 }, { name: '森林公园', value: 1025 },
            { name: '温泉', value: 895 }, { name: '表演', value: 894 }, { name: '海洋', value: 891 },
            { name: '第一', value: 834 }, { name: '著名', value: 831 }, { name: '小镇', value: 819 },
            { name: '度假区', value: 811 }, { name: '漂流', value: 792 }, { name: '寺庙', value: 781 },
            { name: '国际', value: 777 }, { name: '国家森林公园', value: 761 }, { name: '寺院', value: 754 },
            { name: '故居', value: 744 }, { name: '步行街', value: 726 }, { name: '石刻', value: 713 },
            { name: '佛教', value: 693 }, { name: '园林', value: 683 }, { name: '文物保护', value: 666 },
            { name: '自然保护区', value: 662 }, { name: '游乐', value: 652 }, { name: '雕塑', value: 650 },
            { name: '名胜区', value: 650 }, { name: '有名', value: 642 }, { name: '住宿', value: 632 },
            { name: '餐饮', value: 629 }, { name: '书院', value: 600 }, { name: '大桥', value: 583 },
            { name: '花园', value: 575 }, { name: '大殿', value: 560 }, { name: '长城', value: 558 },
            { name: '城墙', value: 555 }, { name: '长廊', value: 546 }, { name: '植物园', value: 544 },
            { name: '动物园', value: 542 }, { name: '山门', value: 539 }, { name: '国内', value: 525 },
            { name: '服务', value: 521 }, { name: '壁画', value: 516 }
        ]
    };

    // 4. 定义两套色系
    // 小众特征偏向神秘/自然：青翠绿、避世蓝、电光紫
    var nicheColors = ['#00E5FF', '#00d887', '#8A2BE2', '#4169E1', '#20B2AA'];
    // 大众特征偏向火热/繁华：朱红、明黄、亮橙
    var massColors = ['#FFD700', '#FF6347', '#FF8C00', '#FF4500', '#ed3f35'];

    // 5. 渲染词云图的核心函数 (传入不同类别名就自动渲染对应风格)
    function renderWordCloud(dataName) {
        // 拿到对应 Tab 的数据
        var currentData = wordCloudData[dataName];

        // 【关键点】：选择当前 Tab 的专属配色
        var currentColors = (dataName === '小众特征') ? nicheColors : massColors;

        var option = {
            // 设置一个符合暗黑大屏的 Tooltip 风格
            tooltip: {
                show: true,
                backgroundColor: 'rgba(1, 47, 74, 0.8)',
                borderColor: currentColors[0], // 提示框边框颜色也会随主题变化，质感UP！
                textStyle: { color: '#fff' }
            },
            series: [{
                type: 'wordCloud',
                shape: 'circle', // 词云形状
                left: 'center', top: 'center',
                width: '85%', height: '85%',
                sizeRange: [12, 55], // 字体大小范围
                rotationRange: [-45, 90], // 旋转角度
                rotationStep: 45,
                gridSize: 8, // 词之间的间距
                drawOutOfBound: false,
                textStyle: {
                    normal: {    // <--- 就是补上这一层
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        color: function () {
                            return currentColors[Math.floor(Math.random() * currentColors.length)];
                        }
                    }
                },
                emphasis: {
                    focus: 'self',
                    textStyle: { shadowBlur: 10, shadowColor: '#000' }
                },
                data: currentData // 注入数据
            }]
        };
        myChart.setOption(option);
    }

    // 6. 首次加载时，默认渲染“小众特征”
    renderWordCloud('小众特征');

    // 7. 点击 Tab 切换逻辑
    var tabs = document.querySelectorAll('.wordcloud-panel .tab-nav a');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            // 移除所有 Tab 的 active 状态
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
            }
            // 给当前点击的 Tab 加上 active 状态
            this.classList.add('active');

            // 获取绑定的类别名（'小众特征' 或 '大众特征'）并重新渲染
            var type = this.getAttribute('data-type');
            renderWordCloud(type);
        });
    }

    // 8. 监听窗口缩放，图表自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();






// 雷达图 - 目的地特征雷达图 (赛博朋克发光版)
(function() {
    // 1. 获取容器
    var chartDom = document.getElementById('radar');
    if (!chartDom) {
        console.warn("⚠️ 找不到雷达图容器 #radar！");
        return;
    }
    var myChart = echarts.init(chartDom);

    // 2. 你提供的完整数据
    var yAxisData = ['🏛️ 博物馆', '🌫️ 避世/秘境', '📸 治愈/出片', '⚪ 常规/中庸景点', '🤫 人少/清净', '🚫 未过度商业化', '🌲 原生态/纯天然'];
    var seriesData = [99, 121, 245, 292, 718, 815, 1458];
    var percentData = [4.9, 5.9, 12.0, 14.3, 35.3, 40.0, 71.6];

    // 3. 构造雷达图指标（名称 + 最大值100）
    var indicatorData = yAxisData.map(name => ({ name: name, max: 100 }));

    // 4. 图表配置项
    var option = {
        tooltip: {
            show: true,
            backgroundColor: 'rgba(1, 47, 74, 0.8)',
            borderColor: '#00E5FF',
            textStyle: { color: '#fff' },
            // 鼠标悬浮显示百分比+数值
            formatter: params => {
                const idx = params.dataIndex;
                return `${params.name}<br/>占比：${percentData[idx]}%<br/>数量：${seriesData[idx]}`;
            }
        },
        legend: {
            data: ['小众目的地特征分布'],
            top: '0%',
            textStyle: {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 8
            }
        },
        radar: {
            indicator: indicatorData,
            center: ['50%', '60%'],
            radius: '65%',
            name: {
                textStyle: {
                    color: '#00E5FF',
                    fontSize: 8,
                    fontWeight: 'bold'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 229, 255, 0.3)',
                    type: 'dashed'
                }
            },
            splitArea: { show: false },
            axisLine: {
                lineStyle: { color: 'rgba(0, 229, 255, 0.3)' }
            }
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: percentData, // 使用百分比数据展示
                    name: '目的地特征分布',
                    itemStyle: { color: '#00E5FF' },
                    lineStyle: { width: 2 },
                    areaStyle: { color: 'rgba(0, 229, 255, 0.3)' }
                }
            ]
        }]
    };

    // 5. 渲染
    myChart.setOption(option);
    window.addEventListener("resize", () => myChart.resize());
})();




// 桑基图模块 - 省份与特征流向
(function() {
    // 1. 认准刚才新发的身份证
    var chartDom = document.getElementById('sankey');
    var myChart = echarts.init(chartDom);

    // 2. 你的专属数据
    var sankeyData = [
        { name: '四川' }, { name: '新疆' }, { name: '自然生态' },
        { name: '西藏' }, { name: '避世村落' }, { name: '黑龙江' },
        { name: '山岳与地质' }, { name: '野生水系' }, { name: '云南' }
    ];

    var sankeyLinks = [
        { source: '云南', target: '山岳与地质', value: 42 },
        { source: '云南', target: '自然生态', value: 7 },
        { source: '云南', target: '避世村落', value: 14 },
        { source: '云南', target: '野生水系', value: 16 },
        { source: '四川', target: '山岳与地质', value: 30 },
        { source: '四川', target: '自然生态', value: 6 },
        { source: '四川', target: '避世村落', value: 11 },
        { source: '四川', target: '野生水系', value: 8 },
        { source: '新疆', target: '山岳与地质', value: 40 },
        { source: '新疆', target: '自然生态', value: 6 },
        { source: '新疆', target: '避世村落', value: 27 },
        { source: '新疆', target: '野生水系', value: 39 },
        { source: '西藏', target: '山岳与地质', value: 26 },
        { source: '西藏', target: '自然生态', value: 6 },
        { source: '西藏', target: '避世村落', value: 14 },
        { source: '西藏', target: '野生水系', value: 35 },
        { source: '黑龙江', target: '山岳与地质', value: 22 },
        { source: '黑龙江', target: '自然生态', value: 10 },
        { source: '黑龙江', target: '避世村落', value: 7 },
        { source: '黑龙江', target: '野生水系', value: 13 }
    ];

    // 3. 图表配置项（科技大屏定制版）
    var option = {
        // 配置一组跟大屏很搭的荧光色系
        color: ['#00FFFF', '#00FFAA', '#00AAFF', '#FFAA00', '#FF00AA', '#AA00FF', '#00FF55', '#2E8B57', '#4169E1'],
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: {
            type: 'sankey',
            layout: 'none',
            top: '10%',
            bottom: '10%',
            left: '5%',
            right: '20%', // 右边留点空隙给文字
            data: sankeyData,
            links: sankeyLinks,
            // 节点样式（那些方块）
            itemStyle: {
                borderWidth: 0,
                opacity: 0.8
            },
            // 连线样式
            lineStyle: {
                color: 'source', // 连线颜色跟随源节点
                curveness: 0.5,  // 线条弯曲度，越流畅越好看
                opacity: 0.3     // 连线弄透明一点，更有呼吸感
            },
            // 鼠标悬浮时高亮关联的线段
            emphasis: {
                focus: 'adjacency'
            },
            // 文字标签样式
            label: {
                color: 'rgba(255, 255, 255, 0.8)', // 白色半透明文字
                fontSize: 12,
                distance: 10
            }
        }
    };

    // 4. 渲染图表并设置自适应
    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize();
    });
})();