import React, { FC, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";

const App: FC = () => {
  const [hasPermission, setHasPermission] = useState(false);


  const mainCamera = useCameraDevice("back");
  const macroCamera = useCameraDevice("front");

  useEffect(() => {
    console.log(mainCamera);

    const getPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };
    getPermissions();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {mainCamera != null ? (
          <Camera
            style={styles.camera}
            device={mainCamera}
            isActive={true}
          />
        ) : (
          <Text>Main camera not found</Text>
        )}
      </View>
      <View style={styles.cameraContainer}>
        {macroCamera != null ? (
          <Camera
            style={styles.camera}
            device={macroCamera}
            isActive={true}
          />
        ) : (
          <Text>Macro camera not found</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default App