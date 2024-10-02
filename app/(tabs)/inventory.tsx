import { ActivityIndicator, View, RefreshControl, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import FetchData from '../../FetchData';
import { ScrollView, Button, Card, H2, Image, Paragraph, XStack, Input, SizeTokens } from 'tamagui';
import type { CardProps } from 'tamagui';

interface Item {
  serialNumber: string;
  computerName: string;
  purchaseDate: string;
  model: string;
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  studentGradYear: string;
  checkOutDate: string;
  deviceType: string;
  description: string;
}

interface InputDemoProps {
  size: SizeTokens;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function ListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, items]);

  const loadData = async () => {
    setRefreshing(true); // Set refreshing to true while data is fetching
    const rawData = await FetchData();
    console.log('rawData:', rawData);
    const formattedData = rawData.map((item: any[]) => ({
      serialNumber: item[3],
      computerName: item[4],
      deviceType: item[1],
      model: item[5],
      description: `${item[1]}, ${item[6]}`,
      imageUrl: `https://example.com/images/${item[0]}.jpg` // Placeholder for image URLs
    }));
    setItems(formattedData);
    setRefreshing(false); // Set refreshing to false once data is fetched
  };

  const filterItems = () => {
    if (searchQuery) {
      const filtered = items.filter(item =>
        item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.computerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  };

  if (!items.length && !refreshing) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadData}
        />
      }>
      <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" paddingVertical="$4" space>
        <InputDemo
          size="$4"
          placeholder="Serial #, Name, Type, or Model"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {filteredItems.map((item, index) => (
          <DemoCard
            key={index}
            title={item.serialNumber}
            description={item.description}
            animation="bouncy"
            size="$4"
            height={200}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
          />
        ))}
      </XStack>
    </ScrollView>
  );
}

function InputDemo(props: InputDemoProps) {
  return (
    <XStack alignItems="center" space="$2">
      <Input
        flex={1}
        size={props.size}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      <Button size={props.size}>Go</Button>
    </XStack>
  );
}

export function DemoCard({ title, description, ...props }: CardProps & { title: string, description: string }) {
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header padded>
        <H2>{title}</H2>
        <Paragraph theme="alt2">{description}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
          }}
        />
      </Card.Background>
    </Card>
  );
}

export default ListPage;
