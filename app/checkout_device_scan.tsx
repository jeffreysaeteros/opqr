import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, YStack } from 'tamagui';
import { useRouter } from 'expo-router';

export default function AddDeviceScan() {
    const [facing, setFacing] = useState<any>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedResult, setScannedResult] = useState<BarcodeScanningResult | null>(null);
    const router = useRouter();

    // Permissions
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission}>Grant permission</Button>
            </View>
        );
    }

    // Scanning
    const handleBarCodeScanned = (result: BarcodeScanningResult) => {
        setScannedResult(result);
    };

    const handleScanAgain = () => {
        setScannedResult(null);
    };

    if (scannedResult) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
                <Text fontSize={18} marginBottom={10}>Barcode Type:</Text>
                <Text fontSize={24} fontWeight="bold" marginBottom={20}>{scannedResult.type}</Text>
                <Text fontSize={18} marginBottom={10}>Scanned Data:</Text>
                <Text fontSize={24} fontWeight="bold" marginBottom={40}>{scannedResult.data}</Text>
                <Button onPress={handleScanAgain}>Scan Again</Button>
            </YStack>
        );
    }

    // Render
    return (
        <View style={styles.container}>
            <CameraView
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={handleBarCodeScanned}
                style={styles.camera}
                facing={facing}
            />
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
});