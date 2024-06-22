import React from 'react';
import { View, Paragraph, SizableText, Button, Group, ListItem, Separator, XGroup, YGroup, YStack, XStack } from 'tamagui';
import { Link } from 'expo-router';

export default function index() {
    return (
        <XStack flex={1} alignItems="center" justifyContent="center" >
            <YStack flex={1} alignItems="center" justifyContent="center" >
                <YGroup px="$4">
                    <YGroup.Item>
                        <Group orientation="horizontal" height="$20">
                            <Group.Item >
                                <Link href="/scan" asChild>
                                    <Button height="100%" size="$5" width="50%">Add Device</Button>
                                </Link>
                            </Group.Item>
                            <Group.Item >
                                <Link href="/scan" asChild>
                                    <Button height="100%" size="$5" width="50%">Checkout Device</Button>
                                </Link>
                            </Group.Item>
                        </Group>
                    </YGroup.Item>
                    <YGroup.Item >
                        <Group orientation="horizontal" height="$20">
                            <Group.Item >
                                <Link href="/modal" asChild>
                                    <Button height="100%" size="$5" width="100%">Device Info</Button>
                                </Link>
                            </Group.Item>
                        </Group>
                    </YGroup.Item>
                </YGroup>
            </YStack>
        </XStack>
    );
}
