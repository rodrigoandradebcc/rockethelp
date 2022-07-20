import { HStack, IconButton, Text, useTheme, VStack, Heading, FlatList, Center } from 'native-base';
import Logo from '../../assets/logo_secondary.svg';
import { SignOut } from 'phosphor-react-native';
import { Filter } from '../../components/Filter/Filter';
import { useState } from 'react';
import { Order, OrderProps } from '../../components/Order';
import { Button } from '../../components/Button';
import { ChatTeardropText } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const {colors} = useTheme();
  const [ selected, setSelected ] = useState<'open' | 'closed'>('open');
  const navigation = useNavigation();
  const [ orders, setOrders ] = useState<OrderProps[]>([{
    id: '123',
    patrimony: '123456',
    when: '18/08/2018 às 10:00',
    status: 'open'
  },
  {
    id: '124',
    patrimony: '123456',
    when: '18/08/2018 às 10:00',
    status: 'open'
  },
  {
    id: '125',
    patrimony: '123456',
    when: '18/08/2018 às 10:00',
    status: 'open'
  }
]);

function handleNewOrder(){
  navigation.navigate('new');
}

function handleOpenDetails(orderId: string){
  navigation.navigate('details', { orderId });
}

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut size={26} color={colors.gray[300]}/>} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center" >
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text
          color="gray.200"
          >
            {orders.length}
          </Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter type='open' title='em andamento' onPress={() => setSelected('open')} isActive={selected === 'open'}/>
          <Filter type='closed' title='finalizados' onPress={() => setSelected('closed')} isActive={selected === 'closed'}/>
        </HStack>

        <FlatList data={orders} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}} ListEmptyComponent={() => (
          <Center>
            <ChatTeardropText size={40} color={colors.gray[300]}/>
            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
              Você ainda não possui {'\n'} solicitaçōes {selected === 'open' ? 'em andamento' : 'finalizadas' }
            </Text>
          </Center>
        )} keyExtractor={item => item.id} renderItem={({item}) => <Order onPress={() => handleOpenDetails(item.id)} data={item}/> }/>
        <Button title='Nova solicitação' onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}