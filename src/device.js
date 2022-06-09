const requireAll = require('require-all');
const path = require('path');

const TYPE = 'devices';

/**
 * A server to provide local devices resource.
 */
class OpenBlockDevice {

    constructor () {
        this.type = TYPE;
    }

    assembleData (userDataPath, formatMessage) {
        const devicesThumbnailData = [];

        const devices = requireAll({
            dirname: `${path.join(userDataPath, this.type)}`,
            filter: /index.js$/,
            recursive: true
        });

        // eslint-disable-next-line global-require
        const deviceList = require(path.join(userDataPath, this.type, 'device.js'));
        deviceList.forEach(listItem => {
            let matched = false;
            Object.entries(devices).forEach(catlog => {
                Object.entries(catlog[1]).forEach(dev => {
                    const content = dev[1]['index.js'](formatMessage);
                    if (content.deviceId === listItem) {
                        const basePath = path.join(this.type, catlog[0], dev[0]);

                        if (content.iconURL) {
                            content.iconURL = path.join(basePath, content.iconURL);
                        }
                        if (content.connectionIconURL) {
                            content.connectionIconURL = path.join(basePath, content.connectionIconURL);
                        }
                        if (content.connectionSmallIconURL) {
                            content.connectionSmallIconURL = path.join(basePath, content.connectionSmallIconURL);
                        }
                        matched = true;
                        devicesThumbnailData.push(content);
                        if (content.typeList) {
                            const tempId = content.deviceId;
                            const tempExtensions = [];
                            content.deviceExtensions.forEach((itemE, idxE) => {
                                tempExtensions[idxE] = (itemE);
                            });
                            let tempExtCompatible = content.deviceExtensionsCompatible;
                            tempExtCompatible = tempExtCompatible.replace(tempExtCompatible[0],
                                tempExtCompatible[0].toUpperCase());
                            const pos = tempId.indexOf('_');

                            content.typeList.forEach(item => {
                                const contentT = JSON.parse(JSON.stringify(content));
                                const deviceType = item;
                                if (pos === -1) {
                                    contentT.deviceId = deviceType + tempId.replace(tempId[0], tempId[0].toUpperCase());
                                } else {
                                    let baseType = tempId.substr(pos + 1);
                                    baseType = baseType.replace(baseType[0], baseType[0].toUpperCase());
                                    const deviceName = tempId.substr(0, pos);
                                    contentT.deviceId = `${deviceName}_${deviceType}${baseType}`;
                                }
                                
                                const deviceExtensions = contentT[`${deviceType}DeviceExtensions`];
                                if (deviceExtensions) {
                                    contentT.deviceExtensions = deviceExtensions;
                                } else {
                                    contentT.deviceExtensions.forEach((itemE, idxE) => {
                                        contentT.deviceExtensions[idxE] = deviceType + tempExtensions[idxE];
                                    });
                                }
                                
                                contentT.deviceExtensionsCompatible = deviceType + tempExtCompatible;
                                const programMode = contentT[`${deviceType}ProgramMode`];
                                if (programMode) {
                                    contentT.programMode = programMode;
                                }
                                const baudrate = contentT[`${deviceType}DefaultBaudRate`];
                                if (baudrate) {
                                    contentT.defaultBaudRate = baudrate;
                                }
                                devicesThumbnailData.push(contentT);
                            });
                        }
                    }
                });
            });
            if (!matched) {
                devicesThumbnailData.push({deviceId: listItem});
            }
        });

        return devicesThumbnailData;
    }
}

module.exports = OpenBlockDevice;
