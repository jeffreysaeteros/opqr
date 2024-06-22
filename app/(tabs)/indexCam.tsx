import { ExternalLink } from '@tamagui/lucide-icons'
import { Anchor, H2, Paragraph, XStack, YStack } from 'tamagui'
import { ToastControl } from 'app/CurrentToast'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabOneScreen() {
  const [facing, setFacing] = useState<any>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View >
      <CameraView facing={facing}>
        <View >
          <TouchableOpacity onPress={toggleCameraFacing}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
