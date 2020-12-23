import Cesium from 'Cesium';
//启动鹰眼功能
function bindMinimap(cesiumViewer, funcWithCursorPos,windowWidth,windowHeight) {
    var handler = new Cesium.ScreenSpaceEventHandler(cesiumViewer.scene.canvas);
    handler.setInputAction(function(movement) {
        let dynamicPosition = undefined;
        let ray = cesiumViewer.camera.getPickRay(movement.endPosition);
        dynamicPosition = cesiumViewer.scene.globe.pick(ray, cesiumViewer.scene);
        let corners=getViewRect(cesiumViewer,cesiumViewer.scene.camera,windowWidth,windowHeight);
        if (Cesium.defined(dynamicPosition)) {
            funcWithCursorPos(Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(dynamicPosition).longitude),
                Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(dynamicPosition).latitude),
                getZoomLevel(cesiumViewer.scene.camera),
                corners
            );
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
//计算相机视域
function getViewRect(cesiumViewer,camera,windowWidth,windowHeight){
    let cornerPos = undefined;
    let ray=undefined;
    let positions=[];
    
    ray = cesiumViewer.camera.getPickRay(new Cesium.Cartesian2(0,0));
    cornerPos = cesiumViewer.scene.globe.pick(ray, cesiumViewer.scene);
    if (!Cesium.defined(cornerPos)){
        return [];
    }
    positions.push([Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).latitude),
    Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).longitude)]);
    
    ray = cesiumViewer.camera.getPickRay(new Cesium.Cartesian2(0,windowHeight));
    cornerPos = cesiumViewer.scene.globe.pick(ray, cesiumViewer.scene);
    if (!Cesium.defined(cornerPos)){
        return [];
    }
    positions.push([Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).latitude),
    Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).longitude)]);
    
    ray = cesiumViewer.camera.getPickRay(new Cesium.Cartesian2(windowWidth,windowHeight));
    cornerPos = cesiumViewer.scene.globe.pick(ray, cesiumViewer.scene);
    if (!Cesium.defined(cornerPos)){
        return [];
    }
    positions.push([Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).latitude),
    Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).longitude)]);
    
    ray = cesiumViewer.camera.getPickRay(new Cesium.Cartesian2(windowWidth,0));
    cornerPos = cesiumViewer.scene.globe.pick(ray, cesiumViewer.scene);
    if (!Cesium.defined(cornerPos)){
        return [];
    }
    positions.push([Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).latitude),
    Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(cornerPos).longitude)]);
    
    return positions
}
//计算地图缩放等级
function getZoomLevel(camera) {
    let h = camera.positionCartographic.height;
    if (h <= 100) { //0.01
        return 19;
    } else if (h <= 300) { //0.02
        return 18;
    } else if (h <= 660) { //0.05
        return 17;
    } else if (h <= 1300) { //0.1
        return 16;
    } else if (h <= 2600) { //0.2
        return 15;
    } else if (h <= 6400) { //0.5
        return 14;
    } else if (h <= 13200) { //1
        return 13;
    } else if (h <= 26000) { //2
        return 12;
    } else if (h <= 67985) { //5
        return 11;
    } else if (h <= 139780) { //10
        return 10;
    } else if (h <= 250600) { //20
        return 9;
    } else if (h <= 380000) { //30
        return 8;
    } else if (h <= 640000) { //50
        return 7;
    } else if (h <= 1280000) { //100
        return 6;
    } else if (h <= 2600000) { //200
        return 5;
    } else if (h <= 6100000) { //500
        return 4;
    } else if (h <= 11900000) { //1000
        return 3;
    } else {
        return 2;
    }
}
export default bindMinimap;