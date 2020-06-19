import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

class DriverModalDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      showSearchBar: true,
    };
  }


  _searchFilterFunction = (searchText, data) => {
    let newData = [];
    if (searchText) {
      newData = data.filter(function (item) {
        const itemData = item.email.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.startsWith(textData);
      });
      this.setState({dataSource: [...newData]});
    } else {
      this.setState({dataSource: this.props.dataSource});
    }
  };

  handleItemSelect = (item) => {
    this.setState({dataSource: this.props.dataSource}, () => {
      this.props.setSelectedIndex(item);
    });
  };

  _renderItemListValues = (item) => {
    const {lightMode} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={darkStyles.listRowClickTouchStyle}
        onPress={() => this.handleItemSelect(item)}>
        <View
          style={
            lightMode
              ? lightStyles.listRowContainerStyle
              : darkStyles.listRowContainerStyle
          }>
          <Text
            style={
              lightMode
                ? lightStyles.listTextViewStyle
                : darkStyles.listTextViewStyle
            }>
            {item.email}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataSource !== prevProps.dataSource) {
      this.getData();
    }
  }

  getData = () => {
    this.setState({dataSource: this.props.dataSource});
  };

  render() {
    const {lightMode} = this.props;
    return (
      <View>
        {this.props.selectedFlag ? (
          <TouchableOpacity
            onPress={() => this.props.toggleModal()}
            disabled={this.props.disabled ? this.props.disabled : false}
            activeOpacity={0.7}>
            <View
              style={
                lightMode ? lightStyles.pickerStyle : darkStyles.pickerStyle
              }>
              <Text
                style={
                  lightMode
                    ? lightStyles.textStyleSelected
                    : darkStyles.textStyleSelected
                }>
                {this.props.selectedValue
                  ? this.props.selectedValue
                  : this.props.value}
              </Text>
              <View style={darkStyles.dropDownImageStyle}>
                <Icon name="angle-down" size={20} color="#000000" />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this.props.toggleModal()}
            disabled={this.props.disabled ? this.props.disabled : false}
            activeOpacity={0.7}>
            <View
              style={
                lightMode ? lightStyles.pickerStyle : darkStyles.pickerStyle
              }>
              <Text
                style={
                  lightMode ? lightStyles.textStyle : darkStyles.textStyle
                }>
                {this.props.selecteLabel}
              </Text>
              <View style={darkStyles.dropDownImageStyle}>
                <Icon name="angle-down" size={20} color="#000000" />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <Modal
          isVisible={this.props.modalVisible}
          hasBackdrop={true}
          backdropColor={'#000000'}
          animationIn="slideInUp"
          animationInTiming={600}
          animationOutTiming={600}
          animationOut="slideOutDown"
          onShow={() => this.setState({dataSource: this.props.dataSource})}
          onBackdropPress={() => this.props.toggleModal()}
          animationType={'fade'}
          onRequestClose={() => this.props.toggleModal()}>
          <View
            style={lightMode ? lightStyles.container : darkStyles.container}>
            <View
              style={
                lightMode
                  ? lightStyles.listDataContainerStyle
                  : darkStyles.listDataContainerStyle
              }>
              <View
                style={
                  lightMode
                    ? lightStyles.pickerTitleContainerStyle
                    : darkStyles.pickerTitleContainerStyle
                }>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.setState({dataSource: this.props.dataSource}, () => {
                      this.props.toggleModal();
                    })
                  }>
                  <View style={darkStyles.dropDownImageStyle}>
                    <Icon name="angle-down" size={20} color="#000000" />
                  </View>
                </TouchableOpacity>
              </View>

              {this.state.showSearchBar ? (
                <View
                  style={
                    lightMode
                      ? lightStyles.searchBarContainerStyle
                      : darkStyles.searchBarContainerStyle
                  }>
                  <TextInput
                    onChangeText={(text) =>
                      this._searchFilterFunction(text, this.state.dataSource)
                    }
                    placeholder={'Search.....'}
                    style={
                      lightMode
                        ? lightStyles.textInputStyle
                        : darkStyles.textInputStyle
                    }
                    underlineColorAndroid="transparent"
                    keyboardType="default"
                    returnKeyType={'done'}
                    blurOnSubmit={true}
                  />
                </View>
              ) : null}

              <FlatList
                style={
                  lightMode
                    ? lightStyles.flatListStyle
                    : darkStyles.flatListStyle
                }
                keyExtractor={(item) => item.id}
                // showsVerticalScrollIndicator={false}
                // extraData={this.state}
                // overScrollMode="never"
                // keyboardShouldPersistTaps="always"
                // numColumns={1}
                data={this.state.dataSource}
                renderItem={({item, index}) =>
                  this._renderItemListValues(item, index)
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const lightStyles = StyleSheet.create({
  searchBarContainerStyle: {
    marginVertical: 10,
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: '#4B4949',
    borderWidth: 1,
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  dropDownImageStyle: {
    marginLeft: 10,
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#000000',
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  pickerStyle: {
    marginTop: 10,
    paddingRight: 28,
    // marginBottom: 8,
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#434B50',
    borderRadius: 6,
    flexDirection: 'row',
    height: 45,
  },
  pickerTitleContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#FFFFFF',
  },

  flatListStyle: {
    maxHeight: '80%',
    minHeight: '30%',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  container: {
    flex: 1,
    backgroundColor: '#F3F4F5',
    marginHorizontal: -20,
    marginVertical: -20,
    justifyContent: 'center',
    padding: 30,
  },
  listRowContainerStyle: {
    color: 'red',
    width: '100%',
    justifyContent: 'center',
  },

  crossImageStyle: {
    width: 16,
    height: 13,
    marginTop: 8,
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
  },

  listDataContainerStyle: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  listRowClickTouchStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  textInputStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    paddingLeft: 15,
    alignSelf: 'center',
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  textStyle: {
    color: 'rgba(123,137,148,0.6)',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  textStyleSelected: {
    color: '#000000',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  buttonStyle: {
    marginHorizontal: 16,
    borderRadius: 6,
    justifyContent: 'center',
    backgroundColor: '#F26D21',
    // width: '93%',
    // padding: 10,
    height: 40,
    marginTop: 16,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

const darkStyles = StyleSheet.create({
  searchBarContainerStyle: {
    marginVertical: 10,
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  dropDownImageStyle: {
    marginLeft: 10,
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  listTextViewStyle: {
    color: '#FFFFFF',
    borderBottomColor: '#232323',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  pickerStyle: {
    marginTop: 10,
    paddingRight: 28,
    // marginBottom: 8,
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: '#000000',
    borderColor: '#434B50',
    borderRadius: 6,
    flexDirection: 'row',
    height: 45,
  },
  pickerTitleContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#0E0E0E',
  },

  flatListStyle: {
    maxHeight: '80%',
    minHeight: '30%',
    backgroundColor: '#0E0E0E',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginHorizontal: -20,
    marginVertical: -20,
    justifyContent: 'center',
    padding: 30,
  },
  listRowContainerStyle: {
    color: 'red',
    width: '100%',
    justifyContent: 'center',
  },

  crossImageStyle: {
    width: 16,
    height: 13,
    marginTop: 8,
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
  },

  listDataContainerStyle: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#0E0E0E',
  },

  listRowClickTouchStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  textInputStyle: {
    backgroundColor: 'white',
    borderRadius: 6,
    color: 'black',
    paddingLeft: 15,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
    alignSelf: 'center',
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  textStyle: {
    color: 'rgba(123,137,148,0.6)',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  textStyleSelected: {
    color: '#FFFFFF',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  buttonStyle: {
    marginHorizontal: 16,
    borderRadius: 6,
    justifyContent: 'center',
    backgroundColor: '#F26D21',
    // width: '93%',
    // padding: 10,
    height: 40,
    marginTop: 16,
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default DriverModalDropDown;
