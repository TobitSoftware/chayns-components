enum DeviceType {
    Desktop,
    Smartphone,
    Tablet,
}

export const getDeviceType = (): DeviceType => {
    const { userAgent } = navigator;

    if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            userAgent
        )
    ) {
        return DeviceType.Smartphone;
    }

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return DeviceType.Tablet;
    }

    return DeviceType.Desktop;
};

export const getIsMobile = (): boolean => {
    const deviceType = getDeviceType();

    return deviceType === DeviceType.Smartphone || deviceType === DeviceType.Tablet;
};
