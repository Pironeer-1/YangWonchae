/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import WeatherProject from './WeatherProject';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(WeatherProject, () => WeatherProject);