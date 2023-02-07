


import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'

function HookCounter() {
    const [count, setCount] = useState(0);
  return (
    <View>
        <Text>Count is: {count}</Text>
        <Button onPress={() => {setCount(count+1)}} title={'Click me'}></Button>
    </View>
  )
}

export default HookCounter