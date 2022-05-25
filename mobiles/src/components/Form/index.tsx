import React, {useState} from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { 
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import {captureScreen} from 'react-native-view-shot';

import {FeedbackType} from '../../components/Widget';
import {feedbackTypes} from '../../utils/feedbackTypes';

import { theme } from '../../theme';

import { styles } from './styles';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

interface Props {
  feedbackType: FeedbackType;
}

export function Form({feedbackType}: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState<string|null>(null);

  function handleScreenshot(){
    captureScreen({
      format: 'jpg',
      quality: 0.8, //80%
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error))
  }

  function handleScreenshotRemove(){
    setScreenshot(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft 
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image 
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem ? Queremos corrigir. Conter com
        detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button isLoading={false} />
      </View>
    </View>
  );
}