import { ExternalLink } from '@tamagui/lucide-icons'
import { View, Text, Button, Anchor, H2, Paragraph, XStack, YStack } from 'tamagui'
import { ToastControl } from 'app/CurrentToast'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function Scan() {
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
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission}></Button>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                style={styles.camera} facing={facing}
            >
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        aspectRatio: 0.6,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});