import React from 'react';
import { View, Paragraph, SizableText, Button, Group, ListItem, Separator, XGroup, YGroup, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'


export default function index() {
    const colorScheme = useColorScheme()

    return (

        <XStack flex={1} alignItems="center" justifyContent="center" >
            {/* <YStack flex={1} alignItems="center" justifyContent="center" > */}
            <YGroup px="$4">
                <YGroup.Item>
                    <Group orientation="horizontal" height="$20">
                        <Group.Item >
                            <Link href="/add_device_scan" asChild>
                                <Button backgroundColor="#000" height="100%" size="$5" width="50%">Add Device</Button>
                            </Link>
                        </Group.Item>
                        <Group.Item >
                            <Link href="/checkout_device_scan" asChild>
                                <Button backgroundColor="#000" height="100%" size="$5" width="50%">Checkout Device</Button>
                            </Link>
                        </Group.Item>
                    </Group>
                </YGroup.Item>
                <YGroup.Item >
                    <Group orientation="horizontal" height="$20">
                        <Group.Item >
                            <Link href="/modal" asChild>
                                <Button backgroundColor="#000" height="100%" size="$5" width="100%">Device Info</Button>
                            </Link>
                        </Group.Item>
                    </Group>
                </YGroup.Item>
            </YGroup>
            {/* </YStack> */}
        </XStack>

    );
}
