import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';
import * as MimeType from 'react-native-mime-types';

import Style, { GRADIENT_COLORS, ICON_SIZE, BLUE } from '../utils/Style';
import StateManager from '../utils/StateManager';

class CreatePostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileType: 'Image'
        }

        this.onToImageSwitched = this.onToImageSwitched.bind(this);
        this.onToVideoSwitched = this.onToVideoSwitched.bind(this);
        this.onPickFilePressed = this.onPickFilePressed.bind(this);
        this.onSharePressed = this.onSharePressed.bind(this);
    }

    render() {
        return (
            <LinearGradient colors={GRADIENT_COLORS} style={Style.container}>
                { this.state.file && (
                    <View>
                        <View style={Style.elementContainer}>
                            { this.state.fileType === 'Image' && (
                                <Image style={{width: '100%', aspectRatio: 1}} source={{uri: this.state.file}} />)
                            }
                            { this.state.fileType === 'Video' && (
                                <Video style={{width: '100%', aspectRatio: 1}} source={{uri: this.state.file}} resizeMode={Video.RESIZE_MODE_COVER} rate={1.0} volume={1.0} useNativeControls={true} />)
                            }
                        </View>
                        <TouchableOpacity onPress={this.onSharePressed} style={Style.buttonContainer}>
                            <View style={Style.horizontalContainer}>
                                <Text style={Style.bigWhiteLabel}>UDOSTĘPNIJ</Text>
                                <AntDesign name='instagram' size={ICON_SIZE} style={Style.whiteIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>)
                }
                { !this.state.file && (
                    <View>
                        <View style={Style.elementContainer}>
                            <View style={Style.horizontalContainer}>
                                <RadioButton value='Image' status={this.state.fileType === 'Image' ? 'checked' : 'unchecked'} onPress={this.onToImageSwitched} color={BLUE} />
                                <Text style={Style.leftLabel}>Zdjęcie</Text>
                            </View>
                            <View style={Style.horizontalContainer}>
                                <RadioButton value='Video' status={this.state.fileType === 'Video' ? 'checked' : 'unchecked'} onPress={this.onToVideoSwitched} color={BLUE} />
                                <Text style={Style.leftLabel}>Film</Text>
                            </View>
                        </View>                    
                        <TouchableOpacity onPress={this.onPickFilePressed} style={Style.buttonContainer}>
                            <View style={Style.horizontalContainer}>
                                <Text style={Style.bigWhiteLabel}>WYBIERZ PLIK</Text>
                                <AntDesign name='addfile' size={ICON_SIZE} style={Style.whiteIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>)
                }
            </LinearGradient>
        )
    }

    onToImageSwitched() {
        StateManager.updateStateProperty(this, 'fileType', 'Image');
    }

    onToVideoSwitched() {
        StateManager.updateStateProperty(this, 'fileType', 'Video');
    }

    async onPickFilePressed() {
        let newFile;
        let result;
        let mediaTypes = this.state.fileType === 'Image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos;
        let permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (!permission.granted) {
            permission = await ImagePicker.requestCameraPermissionsAsync({base64: false, exif: false});
            if (permission.granted) {
                result = await ImagePicker.launchImageLibraryAsync({mediaTypes: mediaTypes});
                if (!result.cancelled) {
                    newFile = result.uri;
                    StateManager.updateStateProperty(this, 'file', newFile);
                }
            }
        } else {
            result = await ImagePicker.launchImageLibraryAsync({mediaTypes: mediaTypes});
            if (!result.cancelled) {
                newFile = result.uri;
                StateManager.updateStateProperty(this, 'file', newFile);
            }
        }
    }

    async onSharePressed() {
        let mimeType = MimeType.lookup(this.state.file);
        await Sharing.shareAsync(this.state.file, {
            mimeType: mimeType,
            dialogTitle: 'Udostępnij',
            UTI: mimeType
        });
    }
}

export default CreatePostView;