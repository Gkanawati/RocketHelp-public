import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, StyledProps, useTheme, VStack } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';

type Props = StyledProps & {
    title: string;
}

export function Header({title, ...rest}) {
    
    const navigation = useNavigation();
    const {colors} = useTheme();

  return (
    <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        pb={6}
        pt={12}
        {...rest}
    >
        <IconButton
            icon={<CaretLeft size={24} color={colors.gray[300]} />}
            onPress={() => navigation.goBack()}
        />

        <Heading flex={1} color='gray.100' textAlign='center' fontSize='lg' ml={-3} mr={9}>
            {title}
        </Heading>
    </HStack>
  );
}