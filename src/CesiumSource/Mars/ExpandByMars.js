define(["../Core/clone"], function (e) {
    "use strict";
    return {
        trustGenerator: ["fanfan"],
        _defaultFloodAnalysis: {
            floodVar: [0, 0, 0, 500],
            ym_pos_x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ym_pos_y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ym_pos_z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            rect_flood: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            floodSpeed: 1,
            ym_max_index: 0,
            globe: !0,
            showElseArea: !0
        },
        floodAnalysis: {
            floodVar: [0, 0, 0, 500],
            ym_pos_x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ym_pos_y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ym_pos_z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            rect_flood: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            floodSpeed: 1,
            ym_max_index: 0,
            globe: !0,
            showElseArea: !0
        },
        resetFloodAnalysis: function () {
            this.floodAnalysis = e(this._defaultFloodAnalysis)
        },
        _defaultExcavateAnalysis: {
            splitNum: 30,
            showSelfOnly: !1,
            dig_pos_x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dig_pos_y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dig_pos_z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            rect_dig: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            dig_max_index: 0,
            excavateHeight: 0,
            excavateMinHeight: 9999,
            excavatePerPoint: !1
        },
        excavateAnalysis: {
            splitNum: 30,
            showSelfOnly: !1,
            dig_pos_x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dig_pos_y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            dig_pos_z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            rect_dig: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            dig_max_index: 0,
            excavateHeight: 0,
            excavateMinHeight: 9999,
            excavatePerPoint: !1
        },
        resetExcavateAnalysis: function () {
            this.excavateAnalysis = e(this._defaultExcavateAnalysis)
        },
        _defaultTilesEditor: {
            floodVar: [0, 0, 0, 0],
            flatRect: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_mat_x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_mat_y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_mat_z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_max_index: 0,
            model_min_height: 50,
            IsYaPing: [!1, !1, !1, !1],
            yp_show_InOrOut: [!1, !0, !0, !1],
            yp_black_texture: null,
            hm_dh_attr: [50, 1, 100],
            modelLight: 2.2,
            times: (new Date).getTime(),
            floodColor: [0, 0, 0, .5]
        },
        tilesEditor: {
            floodVar: [0, 0, 0, 0],
            flatRect: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_mat_x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_mat_y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_mat_z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yp_max_index: 0,
            model_min_height: 50,
            IsYaPing: [!1, !1, !1, !1],
            yp_show_InOrOut: [!1, !0, !0, !1],
            yp_black_texture: null,
            hm_dh_attr: [50, 1, 100],
            modelLight: 2.2,
            times: (new Date).getTime(),
            floodColor: [0, 0, 0, .5]
        },
        resetTilesEditor: function () {
            this.tilesEditor = e(this._defaultTilesEditor)
        },
        underEarth: {
            cullFace: void 0,
            enable: void 0,
            enableDepth: 100,
            enableSkirt: !1
        },
        occlusionOpen: !0
    }
})