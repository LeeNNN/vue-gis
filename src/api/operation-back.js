import request from '@/utils/request'
// 获取3dtile数据 1，倾斜摄影 2，人工建筑，3，电缆井盖，4，电缆井内部，5，变电站，6变电站内部, 7杆塔

export const entityType = [{}]

export const get3Dtiles = (type) => {
  switch (type) {
    case 1: // 倾斜摄影
      return [{
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/01_C/Scene/01_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/02_C/Scene/02_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/03_C/Scene/03_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/04_C/Scene/04_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/05_C/Scene/05_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/06_C/Scene/06_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/07_C/Scene/07_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/08_C/Scene/08_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/09_C/Scene/09_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      },
      {
        url: 'http://192.168.2.172:8880/3dtile/yangzhou_gc/10_C/Scene/10_C.json',
        name: 'qxsy',
        maximumScreenSpaceError: 2,
        show: true
      }
      ]
    case 2: // 人工建筑模型
      return [{
        sbname: 'artificialBuilding', // 人造建筑
        longitudehpd: 119.380119919,
        latitudehpd: 32.3817110,
        heighthpd: -82.049,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DL_DX/tileset.json',
        description: '人工模型1'
      },
      {
        sbname: 'artificialBuilding', // 人造建筑
        longitudehpd: 119.380172619,
        latitudehpd: 32.3812770,
        heighthpd: -8.35,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DL_JZ/tileset.json',
        description: '人工模型2'
      }
      ]
    case 3: // 井盖
      return [{
        sbname: 'msx_dlj_tm_1',
        longitudehpd: 119.38195950,
        latitudehpd: 32.38461200,
        heighthpd: 14.29,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/MSX/MSX_DLJ_TM_01/tileset.json',
        description: '名仕线电缆井1号井盖'
      },

      {
        sbname: 'msx_dlj_tm_2',
        longitudehpd: 119.38872590,
        latitudehpd: 32.38122750,
        heighthpd: -29.15,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/MSX/MSX_DLJ_TM_02/tileset.json',
        description: '名仕线电缆井2号井盖'
      },

      {
        sbname: 'dl_dlj_tm_1',
        longitudehpd: 119.35589170,
        latitudehpd: 32.37152700,
        heighthpd: -6.98,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_TM_1/tileset.json',
        description: '大刘线电缆井1号井盖'
      },

      {
        sbname: 'dl_dlj_tm_2',
        longitudehpd: 119.360279,
        latitudehpd: 32.3763265,
        heighthpd: 9.08,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_TM_2/tileset.json',
        description: '大刘线电缆井2号井盖'
      },

      {
        sbname: 'dl_dlj_tm_3',
        longitudehpd: 119.36417350,
        latitudehpd: 32.376323200,
        heighthpd: 5.21,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_TM_3/tileset.json',
        description: '大刘线电缆井3号井盖'
      },

      {
        sbname: 'dl_dlj_tm_4',
        longitudehpd: 119.36504890,
        latitudehpd: 32.37899970,
        heighthpd: -12.51,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_TM_4/tileset.json',
        description: '大刘线电缆井4号井盖'
      },

      {
        sbname: 'dl_dlj_tm_5',
        longitudehpd: 119.36306400,
        latitudehpd: 32.37879100,
        heighthpd: -9.82,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_TM_5/tileset.json',
        description: '大刘电缆井5号井盖'
      },

      {
        sbname: 'dl_dlj_tm_6',
        longitudehpd: 119.37104063,
        latitudehpd: 32.38132236,
        heighthpd: 1.96,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_TM_6/tileset.json',
        description: '大刘线电缆井6号井盖'
      },

      {
        sbname: 'dl_dlj_tm_7',
        longitudehpd: 119.36144663,
        latitudehpd: 32.38493936,
        heighthpd: -1.15,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_TM_7/tileset.json',
        description: '大刘线电缆井7号井盖'
      },

      {
        sbname: 'hjx_dlj_tm_01',
        longitudehpd: 119.36586796,
        latitudehpd: 32.3843888,
        heighthpd: -11.84,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/HJX/HJX_DLJ_TM_1/tileset.json',
        description: '荟景线电缆井1号井盖'
      },

      {
        sbname: 'hjx_dlj_tm_02',
        longitudehpd: 119.37111024,
        latitudehpd: 32.38133685,
        heighthpd: -1.26,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/HJX/HJX_DLJ_TM_2/tileset.json',
        description: '荟景线电缆井2号井盖'
      },

      {
        sbname: 'hjx_dlj_tm_03',
        longitudehpd: 119.3674821,
        latitudehpd: 32.3784541,
        heighthpd: 40.6,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/HJX/HJX_DLJ_TM_3/tileset.json',
        description: '荟景线电缆井3号井盖'
      },

      {
        sbname: 'ad_dlj_tm_01',
        longitudehpd: 119.3758945,
        latitudehpd: 32.3839133,
        heighthpd: -7.29,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_01/tileset.json',
        description: '奥都线电缆井1号井盖'
      },

      {
        sbname: 'ad_dlj_tm_02',
        longitudehpd: 119.3776822,
        latitudehpd: 32.3852805,
        heighthpd: 1.88,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_02/tileset.json',
        description: '奥都线电缆井2号井盖'
      },

      {
        sbname: 'ad_dlj_tm_03',
        longitudehpd: 119.3777370,
        latitudehpd: 32.3848120,
        heighthpd: -2.79,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_03/tileset.json',
        description: '奥都线电缆井3号井盖'
      },

      {
        sbname: 'ad_dlj_tm_04',
        longitudehpd: 119.3786326,
        latitudehpd: 32.3840205,
        heighthpd: 1.9,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_04/tileset.json',
        description: '奥都线电缆井4号井盖'
      },

      {
        sbname: 'ad_dlj_tm_05',
        longitudehpd: 119.3770780,
        latitudehpd: 32.3838850,
        heighthpd: 0.9,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_05/tileset.json',
        description: '奥都线电缆井5号井盖'
      },

      {
        sbname: 'ad_dlj_tm_06',
        longitudehpd: 119.3764980,
        latitudehpd: 32.3827327,
        heighthpd: 1.54,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_06/tileset.json',
        description: '奥都线电缆井6号井盖'
      },

      {
        sbname: 'ad_dlj_tm_07',
        longitudehpd: 119.3773305,
        latitudehpd: 32.3799895,
        heighthpd: 15.328,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_07/tileset.json',
        description: '奥都线电缆井7号井盖'
      },

      {
        sbname: 'ad_dlj_tm_08',
        longitudehpd: 119.3792192,
        latitudehpd: 32.3798490,
        heighthpd: -1.85,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_08/tileset.json',
        description: '奥都线电缆井8号井盖'
      },

      {
        sbname: 'ad_dlj_tm_09',
        longitudehpd: 119.3883398,
        latitudehpd: 32.38705870,
        heighthpd: 6,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_TM_09/tileset.json',
        description: '奥都线电缆井9号井盖'
      }

      ]
    case 4: // 电缆井底座
      return [{
        sbname: 'msx_dlj_down_1',
        longitudehpd: 119.38391785,
        latitudehpd: 32.38312105,
        heighthpd: 8.645,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/MSX/MSX_DLJ_DOWN_01/tileset.json',
        description: '名仕线电缆井1号底部'
      },
      {
        sbname: 'msx_dlj_down_2',
        longitudehpd: 119.38849170,
        latitudehpd: 32.380979950,
        heighthpd: -19.38,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/MSX/MSX_DLJ_DOWN_02/tileset.json',
        description: '名仕线电缆井2号底部'
      },
      {
        sbname: 'dl_dlj_down_1',
        longitudehpd: 119.35588700,
        latitudehpd: 32.37152200,
        heighthpd: -7.33,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_DOWN_1/tileset.json',
        description: '大刘线电缆井1号底座'
      },
      {
        sbname: 'dl_dlj_down_2',
        longitudehpd: 119.360285,
        latitudehpd: 32.376325,
        heighthpd: 8.22,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_DOWN_2/tileset.json',
        description: '大刘线电缆井2号底座'
      },
      {
        sbname: 'dl_dlj_down_3',
        longitudehpd: 119.36417500,
        latitudehpd: 32.37631500,
        heighthpd: 4.92,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_DOWN_3/tileset.json',
        description: '大刘线电缆井3号底座'
      },
      {
        sbname: 'dl_dlj_down_4',
        longitudehpd: 119.36504680,
        latitudehpd: 32.37899309,
        heighthpd: -12.84,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_DOWN_4/tileset.json',
        description: '大刘线电缆井4号底座'
      },
      {
        sbname: 'dl_dlj_down_5',
        longitudehpd: 119.36305900,
        latitudehpd: 32.37878900,
        heighthpd: -9.82,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_DOWN_5/tileset.json',
        description: '大刘电缆井5号底座'
      },
      {
        sbname: 'dl_dlj_down_6',
        longitudehpd: 119.37103700,
        latitudehpd: 32.38132285,
        heighthpd: 2.04,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_DOWN_6/tileset.json',
        description: '大刘线电缆井6号底座'
      },
      {
        sbname: 'dl_dlj_down_7',
        longitudehpd: 119.36144903,
        latitudehpd: 32.38494066,
        heighthpd: -1.18,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/DL/DL_DLJ_DOWN_7/tileset.json',
        description: '大刘线电缆井7号底座'
      },
      {
        sbname: 'hjx_dlj_down_01',
        longitudehpd: 119.36586750,
        latitudehpd: 32.3843934,
        heighthpd: -12.27,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/HJX/HJX_DLJ_DOWN_1/tileset.json',
        description: '荟景线电缆井1号底座'
      },
      {
        sbname: 'hjx_dlj_down_02',
        longitudehpd: 119.37110965,
        latitudehpd: 32.3813370,
        heighthpd: -2.13,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/HJX/HJX_DLJ_DOWN_2/tileset.json',
        description: '荟景线电缆井2号底座'
      },
      {
        sbname: 'hjx_dlj_down_03',
        longitudehpd: 119.3674821,
        latitudehpd: 32.3784496,
        heighthpd: 40.36,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/HJX/HJX_DLJ_DOWN_3/tileset.json',
        description: '荟景线电缆井3号底座'
      },
      {
        sbname: 'ad_dlj_down_01',
        longitudehpd: 119.3758950,
        latitudehpd: 32.3837550,
        heighthpd: -7.47,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_01/tileset.json',
        description: '奥都线电缆井1号底座'
      },
      {
        sbname: 'ad_dlj_down_02',
        longitudehpd: 119.3776810,
        latitudehpd: 32.3852760,
        heighthpd: 1.1,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_02/tileset.json',
        description: '奥都线电缆井2号底座'
      },
      {
        sbname: 'ad_dlj_down_03',
        longitudehpd: 119.3777348,
        latitudehpd: 32.3848120,
        heighthpd: -2.66,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_03/tileset.json',
        description: '奥都线电缆井3号底座'
      },
      {
        sbname: 'ad_dlj_down_04',
        longitudehpd: 119.3786350,
        latitudehpd: 32.384020,
        heighthpd: 1.3,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_04/tileset.json',
        description: '奥都线电缆井4号底座'
      },
      {
        sbname: 'ad_dlj_down_05',
        longitudehpd: 119.3770780,
        latitudehpd: 32.3838850,
        heighthpd: 0.21,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_05/tileset.json',
        description: '奥都线电缆井5号底座'
      },
      {
        sbname: 'ad_dlj_down_06',
        longitudehpd: 119.3764980,
        latitudehpd: 32.3827350,
        heighthpd: 1.54,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_06/tileset.json',
        description: '奥都线电缆井6号底座'
      },
      {
        sbname: 'ad_dlj_down_07',
        longitudehpd: 119.3773410,
        latitudehpd: 32.3799868,
        heighthpd: 15,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_07/tileset.json',
        description: '奥都线电缆井7号底座'
      },
      {
        sbname: 'ad_dlj_down_08',
        longitudehpd: 119.3792281,
        latitudehpd: 32.3798457,
        heighthpd: -2.27,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_08/tileset.json',
        description: '奥都线电缆井8号底座'
      },
      {
        sbname: 'ad_dlj_down_09',
        longitudehpd: 119.3883430,
        latitudehpd: 32.38706450,
        heighthpd: 5.82,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/DLJ/AD/AD_DLJ_DOWN_09/tileset.json',
        description: '奥都线电缆井9号底座'
      }
      ]
    case 5: // 配电室外壳
      return [{
        sbname: 'dl_pds_tm',
        longitudehpd: 119.35965159,
        latitudehpd: 32.37447097,
        heighthpd: 40.6,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/DL/DL_PDS_TM/tileset.json',
        description: '大刘线配电室透明部分'
      },
      {
        sbname: 'msx_pds_tm',
        longitudehpd: 119.38701400,
        latitudehpd: 32.38284700,
        heighthpd: -3.7,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/MSX/MSX_PDS_01/tileset.json',
        description: '名仕线配电室透明部分'
      },
      {
        sbname: 'hjx_pds_tm',
        longitudehpd: 119.3673821,
        latitudehpd: 32.3818736,
        heighthpd: 24.6,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/HJX/HJX_PDS_TM/tileset.json',
        description: '荟景线配电室透明部分'
      },
      {
        sbname: 'ad_pds_tm',
        longitudehpd: 119.3824930,
        latitudehpd: 32.38358950,
        heighthpd: -53.2,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/AD/AD_PDS_TM/tileset.json',
        description: '奥都线配电室透明部分'
      }
      ]
    case 6: // 配电室内部
      return [{
        sbname: 'dl_pds_down',
        longitudehpd: 119.36004819,
        latitudehpd: 32.37623697,
        heighthpd: 98.7,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/DL/DL_PDS_DOWN/tileset.json',
        description: '大刘线配电室内部'
      },
      {
        sbname: 'msx_pds_down',
        longitudehpd: 119.38715459,
        latitudehpd: 32.38320397,
        heighthpd: -7.5,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/MSX/MSX_PDS_02/tileset.json',
        description: '名仕线配电室室内部分'
      },
      {
        sbname: 'hjx_pds_down',
        longitudehpd: 119.3673821,
        latitudehpd: 32.38187885,
        heighthpd: 21,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/HJX/HJX_PDS_DOWN/tileset.json',
        description: '荟景线配电室室内部分'
      },
      {
        sbname: 'ad_pds_down',
        longitudehpd: 119.3824819,
        latitudehpd: 32.38359320,
        heighthpd: -55.4,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/PDS/AD/AD_PDS_DOWN/tileset.json',
        description: '奥都线配电室内部部分'
      }
      ]
    case 7: // 杆塔
      return [{
        sbname: 'msx_gt',
        longitudehpd: 119.38641619,
        latitudehpd: 32.3834724,
        heighthpd: 4.37,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/GT/MSX_GT/gt_jieguo/tileset.json',
        description: '名仕线杆塔'
      },
      {
        sbname: 'dlx_gt_01',
        longitudehpd: 119.361078900,
        latitudehpd: 32.37805517,
        heighthpd: -40,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/GT/DL_GT/DL_GT_01/tileset.json',
        description: '大刘线杆塔1号'
      },
      {
        sbname: 'dlx_gt_02',
        longitudehpd: 119.36133992,
        latitudehpd: 32.37995762,
        heighthpd: 3,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/GT/DL_GT/DL_GT_02/tileset.json',
        description: '大刘线杆塔2号'
      },
      {
        sbname: 'dlx_gt_03',
        longitudehpd: 119.36585102,
        latitudehpd: 32.38257257,
        heighthpd: -1,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/GT/DL_GT/DL_GT_03/tileset.json',
        description: '大刘线杆塔3号'
      },
      {
        sbname: 'dlx_gt_04',
        longitudehpd: 119.35965202,
        latitudehpd: 32.38481597,
        heighthpd: -40,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/GT/DL_GT/DL_GT_04/tileset.json',
        description: '大刘线杆塔4号'
      },
      {
        sbname: 'dlx_gt_05',
        longitudehpd: 119.35968952,
        latitudehpd: 32.38774957,
        heighthpd: -47,
        url: 'http://192.168.2.172:8880/3dtile/manual/DLJ_PDS_GT_DX_JZ/GT/DL_GT/DL_GT_05/tileset.json',
        description: '大刘线杆塔5号'
      }
      ]
  }
}
// return request({
//   url: '/safetyState/getSafetyLists',
//   method: 'post',
//   data
// })querylist.do
// 获取所有的
export const getAllDLJByDLX_get = ({
  query = '',
  bdzid = 1,
  dlxid = 1
}) => {
  console.log('调用远程接口')
  return request({
    url: '/dljxg/getAllDLJByDLX_get',
    method: 'get',
    params: {
      query,
      bdzid,
      dlxid
    }
  })
}
export const getChannelCanUse = (code) => {
  console.log('查询可用通道电缆井')
  return request({
    url: 'dljxg/toCanUse_get',
    method: 'get',
    params: {
      code
    }
  })
}
// 获取电缆井通道()
export const getAllDLJTD = (codes, parentcode) => {
  console.log('调用远程接口')
  return request({
    url: '/dljxg/getAllDLJTD_get',
    method: 'post',
    params: {
      codes,
      parentcode
    }
  })
}
export const getAllDLJInfo = (data) => {
  console.log('获取所有电缆井信息')
  return request({
    url: '/equipment/getAllDLJInfo_post',
    method: 'post',
    data: data
  })
}
/* export const getAllDLJInfo= ({
  type= 2,
  id= '',
  query= ''
}) => {
  console.log('获取所有电缆井信息')
  return request({
    url: 'getAllDLJInfo_post',
    method: 'post',
    params: {
      type,
      id,
      query
    }
  })
} */

export const getAllHWGInfo = (data) => {
  console.log('获取全部环网柜')
  return request({
    url: '/equipment/getAllHWGInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllPDSInfo = (data) => {
  console.log('获取全部配电房')
  return request({
    url: '/equipment/getAllPDSInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllKGZInfo = (data) => {
  console.log('获取全部开关站')
  return request({
    url: '/equipment/getAllKGZInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllGTInfo = (data) => {
  console.log('获取全部杆塔')
  return request({
    url: '/equipment/getAllGTInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllDLFZXInfo = (data) => {
  console.log('获取全部电缆分支箱')
  return request({
    url: '/equipment/getAllDLFZXInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllZSKGInfo = (data) => {
  console.log('获取全部柱上开关')
  return request({
    url: '/equipment/getAllZSKGInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllXBInfo = (data) => {
  console.log('获取全部箱式变压器')
  return request({
    url: '/equipment/getAllXBInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllZSBYQInfo = (data) => {
  console.log('获取全部柱上变压器')
  return request({
    url: '/equipment/getAllZSBYQInfo_post',
    method: 'post',
    data: data
  })
}

export const getAllDLX = (data) => {
  console.log('获取全部线路')
  return request({
    url: 'pw/getAllDLX_post',
    method: 'post',
    data: data
  })
}

export const getAllXLDGet = (bstype, bsid) => {
  console.log('获取全部标识')
  return request({
    url: '/dljxg/getAllXLD_get',
    method: 'get',
    params: {
      bstype,
      bsid
    }
  })
}

export const getAllYH = (data) => {
  console.log('获取隐患')
  return request({
    url: '/malfunction/getAllMalfunctionYH_post',
    // url: '/malfunction/getAllMalfunctionYH_post',
    method: 'post',
    data: data
  })
}

export const getAllQX = (data) => {
  console.log('获取缺陷')
  return request({
    url: '/malfunction/getAllMalfunction_post',
    method: 'post',
    data: data
  })
}

export const getAllGZ = (data) => {
  console.log('获取故障')
  return request({
    // url: '/malfunction/getAllPWGZ_post',
    url: 'dljxg/getAllPWGZ_post',
    method: 'post',
    data: data
  })
}

export const getFlawType = ({
  parentid = ''
}) => {
  console.log('获取缺陷类型')
  return request({
    url: '/malfunction/getAllMalfunctionLX_get',
    method: 'get',
    params: {
      parentid
    }
  })
}

export const getAllJGGet = (data) => {
  console.log('根据编码获取间隔信息')
  return request({
    url: '/dljxg/getAllJG_get',
    method: 'get',
    params: {
      code: data.code,
      hwgcode: data.hwgcode,
      kgzcode: data.kgzcode,
      pdscode: data.pdscode,
      xbcode: data.xbcode
    }
  })
}

export const downloadFlaw = ({
  type = ''
}) => {
  console.log('下载缺陷模板文件')
  return request({
    url: '/malfunction/getExcelModel_get',
    method: 'get',
    params: {
      type
    }
  })
}

export const downloadDanger = ({
  type = ''
}) => {
  console.log('下载隐患模板文件')
  return request({
    url: '/malfunction/getExcelModel_get',
    method: 'get',
    params: {
      type
    }
  })
}

export const eliminatedFlaw = ({
  id = '',
  jjsj = ''
}) => {
  console.log('消除缺陷')
  return request({
    url: '/malfunction/toUpdatePart_update',
    method: 'get',
    params: {
      id,
      jjsj
    }
  })
}

export const getAllFacByParams = ({
  bdzid = '',
  dlxid = '',
  type = ''
}) => {
  console.log('获取线路上所有设备')
  return request({
    url: '/equipment/getAllFacByParams_get',
    method: 'get',
    params: {
      bdzid,
      dlxid,
      type
    }
  })
}

/* export const addFlaw = ({
  qx = '',
  sbs = ''
}) => {
  console.log('新增缺陷')
  return request({
    url: '/malfunction/InsertOrUpdateQX_update',
    method: 'post',
    params: {
      qx,
      sbs
    }
  })
} */

export const addFlaw = (data) => {
  console.log('新增缺陷')
  return request({
    url: '/malfunction/InsertOrUpdateQX_update',
    method: 'post',
    data: data
  })
}

export const getSubstation = (data) => {
  console.log('获取所有信息变电站')
  return request({
    url: '/equipment/getAllBDZInfo_get',
    method: 'get',
    data: data
  })
}

export const eliminatedDanger = ({
  id = '',
  jssj = ''
}) => {
  console.log('消除隐患')
  return request({
    url: '/malfunction/toUpdateYHPart_update',
    method: 'get',
    params: {
      id,
      jssj
    }
  })
}

export const addDanger = (data) => {
  console.log('新增隐患')
  return request({
    url: '/malfunction/InsertOrUpdateYH_update',
    method: 'post',
    params: {
      yh: JSON.stringify(data.yh),
      sbs: JSON.stringify(data.sbs)
    }
  })
}
